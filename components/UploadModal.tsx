"use client";
import uniqid from "uniqid";
import React, { useState } from "react";
import Modal from "./Modal";
import useUploadModal from "@/hooks/useUploadModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal = () => {
  const [isLoading, setisLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { toast } = useToast();
  const { user } = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });
  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // upload to supabase
    try {
      setisLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
      if (!imageFile || !songFile || !user)
        return toast({
          title: "Error",
          description: "Missing Fields",
          variant: "destructive",
        });
      const uniqueID = uniqid();
      // upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (songError) {
        setisLoading(false);
        return toast({
          title: "Error",
          description: "Error while uploading song",
          variant: "destructive",
        });
      }
      const { data: ImageData, error: ImageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (ImageError) {
        setisLoading(false);
        return toast({
          title: "Error",
          description: "Error while uploading song image",
          variant: "destructive",
        });
      }
      // now create song.
      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: ImageData.path,
          song_path: songData.path,
        });
      if (supabaseError) {
        setisLoading(false);
        return toast({
          title: "Error",
          description: "Error while uploading song",
          variant: "destructive",
        });
      }
      router.refresh();
      setisLoading(false);
      toast({
        title: "Success",
        description: "Song uploaded successfully",
        variant: "default",
        className: "bg-green-400 border-none "
      })
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <Modal
      title="Add Song"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", {
            required: true,
          })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", {
            required: true,
          })}
          placeholder="Song author"
        />
        <div className="">
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            disabled={isLoading}
            accept=".mp3"
            {...register("song", {
              required: true,
            })}
            type="file"
          />
        </div>
        <div className="">
          <div className="pb-1">Select a song image</div>
          <Input
            id="image"
            disabled={isLoading}
            accept="image/*"
            {...register("image", {
              required: true,
            })}
            type="file"
          />
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          className="bg-green-500 px-6 py-2 hover:bg-green-500/50  text-black rounded-2xl"
        >
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
