"use client";
import uniqid from "uniqid";
import React, { useState } from "react";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import usePlaylistModal from "@/hooks/usePlaylistModal";
import { getName } from "./utils/Header";

const PlaylistModal = () => {
  const [isLoading, setisLoading] = useState(false);
  const playlistModal = usePlaylistModal();
  const { toast } = useToast();
  const { user } = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      author: "",
      image: "",
    },
  });
  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      playlistModal.onClose();
    }
  };
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // upload to supabase
    try {
      setisLoading(true);
      // creating a playlist.
      const imageFile = values.image?.[0];
      let image = "";
      if (imageFile) {
        const uniqueID = uniqid();
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
        image = ImageData.path;
      }
      const { data, error } = await supabaseClient.from("playlist").insert([
        {
          name: values.name,
          description: values.description,
          author: getName(user),
          image_path: image,
          user_id: user?.id,
        },
      ]);
      console.log(data, error);
      if(error) {
        toast({
          title: "Error",
          description: "Error while creating playlist",
          variant: "destructive",
        });
        console.error(error);
        setisLoading(false);
        return;
      }
      // playlist created.
      setisLoading(false);
      toast({
        title: "Success",
        description: "Playlist created successfully",
        variant: "default",
        className: "bg-green-400 border-none "
      });
      router.refresh();
      reset();
      playlistModal.onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: error?.toString(),
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <Modal
      title="Create a new playlist"
      description=""
      isOpen={playlistModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="name"
          disabled={isLoading}
          {...register("name", {
            required: true,
          })}
          placeholder="Playlist name"
        />
        <Input
          id="description"
          disabled={isLoading}
          {...register("description", {
            required: false,
          })}
          placeholder="Playlist description"
        />
        <div className="">
          <div className="pb-1">
            Playlist Image {"("}optional{")"}
          </div>
          <Input
            id="image"
            disabled={isLoading}
            accept="image/*"
            {...register("image", {
              required: false,
            })}
            type="file"
          />
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          className="bg-green-500 px-6 py-2 hover:bg-green-500/50  text-black rounded-2xl"
        >
          Create Playlist
        </Button>
      </form>
    </Modal>
  );
};

export default PlaylistModal;
