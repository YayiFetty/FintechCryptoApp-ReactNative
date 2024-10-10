import { Alert } from "react-native";
import { supabase } from "../lib/supabase";
import { useUserStore } from "store/useUserStore";

export default function Auth() {
  const { session, setSession, setUser } = useUserStore();

  async function signInWithEmail(email: string, password: string) {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      Alert.alert(error.message);
      return { error };
    }

    //store session
    setSession(data.session);
    setUser(data.user);

    return { data };
  }

  async function signUpWithEmail(email: string, password: string) {
    const { error, data } = await supabase.auth.signUp({ email, password });
    if (error) {
      Alert.alert(error.message);
      return { error };
    }
    await createUserProfile(); // Create a profile after successful signup
    return { data };
  }

  async function createUserProfile() {
    if (!session?.user.id) throw new Error("User is not logged in");

    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", session.user.id)
      .single(); 

    if (error && error.code === 'PGRST116') {
      const email = session.user.email;
      const username = email ? email.split("@")[0] : "User";
      const firstLetter = email ? email[0].toUpperCase() : "U";
      const placeholderAvatarUrl = `https://ui-avatars.com/api/?name=${firstLetter}&background=random`;

      const { error: createError } = await supabase
        .from("profiles")
        .insert({
          id: session.user.id,
          username,
          avatar_url: placeholderAvatarUrl,
          website: null,
        });

      if (createError) {
        console.error("Error creating user profile:", createError);
      }
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert(error.message);
      return { error };
    }
    setUser(null);
    setSession(null);
    return { success: true };
  }

  async function getUserProfile() {
    if (!session?.user.id) throw new Error("User is not logged in");

    const { data, error, status } = await supabase
      .from("profiles")
      .select("username, avatar_url, website")
      .eq("id", session.user.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      if (status === 406) {
        // No profile found, return default values
        const email = session.user.email;
        const username = email ? email.split("@")[0] : "User";
        const firstLetter = email ? email[0].toUpperCase() : "U";
        const placeholderAvatarUrl = `https://ui-avatars.com/api/?name=${firstLetter}&background=random`;

        return {
          username,
          avatar_url: placeholderAvatarUrl,
          website: null,
        };
      }
      throw error;
    }

    // Handle missing data
    const email = session.user.email;
    const firstLetter = email ? email[0].toUpperCase() : "U";
    const placeholderAvatarUrl = `https://ui-avatars.com/api/?name=${firstLetter}&background=random`;

    data.avatar_url = data.avatar_url || placeholderAvatarUrl;
    if (!data.username) {
      const username = email ? email.split("@")[0] : "User";
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          username,
          avatar_url: data.avatar_url,
        })
        .eq("id", session.user.id);

      if (updateError) {
        console.error("Error updating username or avatar URL:", updateError);
      } else {
        data.username = username;
      }
    }

    return { data, error, status };
  }

  async function updateUserProfile(username: string, avatarUrl: string, website: string) {
    if (!session?.user.id) throw new Error("User is not logged in");

    const updates = {
      id: session.user.id,
      username,
      website,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    };

    const { data, error } = await supabase
      .from("profiles")
      .upsert(updates);

    return { data, error };
  }

  return {
    signInWithEmail,
    signUpWithEmail,
    signOut,
    getUserProfile,
    updateUserProfile,
    createUserProfile,
  };
}
