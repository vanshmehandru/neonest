"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Share2, Image as ImageIcon, Heart, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

export default function CommunityBlog() {
  const { token } = useAuth();
  const [publicMemories, setPublicMemories] = useState([]);
  const [privateMemories, setPrivateMemories] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    isPublic: true,
  });

  const fetchMemories = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/memories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPublicMemories(res.data.publicMemories);
      setPrivateMemories(res.data.privateMemories);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsLoading(true);
    try {
      const data = new FormData();
      data.append("description", formData.description);
      data.append("isPublic", formData.isPublic);
      data.append("type", "image");
      data.append("file", file);

      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/memories`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchMemories();
      setFormData({ description: "", isPublic: true });
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLike = async (id) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/memories/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchMemories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-6">
      {/* Upload Section */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Share a Memory</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Choose an image
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                {preview ? (
                  <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG (MAX. 5MB)
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Add a caption
            </label>
            <textarea
              placeholder="What's this memory about?"
              className="w-full p-2 border rounded min-h-[100px]"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={(e) =>
                    setFormData({ ...formData, isPublic: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {formData.isPublic ? "Public" : "Private"}
                </span>
              </label>
            </div>
            <Button
              onClick={handleUpload}
              disabled={!file || isLoading}
              className="px-6"
            >
              {isLoading ? "Uploading..." : "Share"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Public Memories Section */}
      {publicMemories.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-xl font-semibold">
                Community Memories
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {publicMemories.map((memory) => (
                <div
                  key={memory.id}
                  className="group relative rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gray-100 relative">
                    {memory.file ? (
                      <Image
                        src={memory.file}
                        alt={memory.description || "Memory"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ImageIcon className="w-10 h-10" />
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                    <p className="text-white text-sm line-clamp-2">
                      {memory.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      {/* Proivate Memories Section */}
      {privateMemories.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-xl font-semibold">
                Private Memories
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {privateMemories.map((memory) => (
                <div
                  key={memory.id}
                  className="group relative rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gray-100 relative">
                    {memory.file ? (
                      <Image
                        src={memory.file}
                        alt={memory.description || "Memory"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ImageIcon className="w-10 h-10" />
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                    <p className="text-white text-sm line-clamp-2">
                      {memory.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}