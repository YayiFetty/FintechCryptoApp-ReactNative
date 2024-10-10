import { View, Text, StyleSheet, Image, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from 'lib/supabase'
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

interface Props{
    size:number;
    url: string | null;
    onUpload: (url:string) => void; 
    showUpload?:boolean
}

const Avatar = ({url, size=150, onUpload, showUpload}: Props) => {
    const [uploading, setUploading] = useState(false);  
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);    
    const avatarSize = {height:size, width:size, borderRadius:size/2}

    useEffect(() => {
        if(url) downloadImage(url)
    }, [url])

    async function downloadImage(path:string){
        try{
            const {data, error} = await supabase.storage
            .from('avatars')
            .download(path)

            if(error) {
                throw error
            }
            const fr = new FileReader();
            fr.readAsDataURL(data);
            fr.onload = () => {
                setAvatarUrl(fr.result as string)
            }       
        }
        catch(err){
            if(err instanceof Error){
                console.log("Error downloading image", err.message)   
            }   
        }
    }

    async function uploadAvatar(){
        try {
            setUploading(true)

            // Request permission to access the photo library
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (status !== 'granted') {
                throw new Error('Permission to access media library was denied')
            }

            // Launch the image picker
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            })

            if (result.canceled) {
                return
            }

            if (!result.assets || result.assets.length === 0) {
                throw new Error('No image selected')
            }

            const image = result.assets[0]

            // Upload the image
            const fileExt = image.uri.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            let { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, {
                    uri: image.uri,
                    type: image.type || 'image',
                    name: fileName,
                })

            if (uploadError) {
                throw uploadError
            }

            // Get the public URL
            const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
            
            // Update the avatar URL
            setAvatarUrl(data.publicUrl)
            onUpload(data.publicUrl)
        } catch (error) {
            if (error instanceof Error) {
                console.log('Error uploading avatar:', error.message)
            }
        } finally {
            setUploading(false)
        }
    }

    return (
        <View>
            {avatarUrl ? (
                <View className='relative'>
                    <Image 
                        source={{uri: avatarUrl}} 
                        accessibilityLabel='Avatar'
                        style={[avatarSize, styles.avatar, styles.image]} 
                    />
                    {showUpload && (
                        <Pressable onPress={uploadAvatar} className='absolute right-0 bottom-0'>
                            <MaterialIcons name="file-upload" size={24} color="black" />
                        </Pressable>
                    )}
                </View>
            ) : (
                <View 
                    style={[avatarSize, styles.avatar, styles.noImage]}
                    className='justify-center items-center'
                >
                    <ActivityIndicator color="white"/>
                </View>
            )}

            {showUpload && !avatarUrl && (
                <View className='absolute right-0 bottom-0'>
                    {!uploading ? (
                        <Pressable onPress={uploadAvatar}>
                            <MaterialIcons name="cloud-upload" size={30} color="black" />
                        </Pressable>
                    ) : (
                        <ActivityIndicator color="white"/>
                    )}
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    avatar:{
        overflow:"hidden",
        maxWidth:"100%",
        position:"relative"
    },
    image:{
        objectFit:"cover",
        padding:0,
    },
    noImage:{
        backgroundColor:"gray",
        borderWidth:2,
        borderStyle:"solid",
        borderColor:"rgb(200,200,200)",
        borderRadius:20,
    }
})

export default Avatar