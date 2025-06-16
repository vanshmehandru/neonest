"use client"

import { useState, useRef, useEffect } from "react";
import { Music, Upload, Trash2, Timer, X } from "lucide-react";

export default function LullabyModal({ show, onClose }) {
  const [lullabies, setLullabies] = useState([
    { id: "1", title: "Twinkle Twinkle", src: "/audio/twinkle.mp3", isCustom: false },
    { id: "2", title: "Brahms Lullaby", src: "/audio/brahms.mp3", isCustom: false }
  ]);

  const [currentId, setCurrentId] = useState(null);
  const [timer, setTimer] = useState(0);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timer > 0 && audioRef.current) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        audioRef.current.pause();
        setCurrentId(null);
      }, timer * 60 * 1000);
    }
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, [timer]);

  const playLullaby = (id, src) => {
    if (audioRef.current) {
      audioRef.current.src = src;
      audioRef.current.play();
      setCurrentId(id);
    }
  };

  const stopLullaby = () => {
    audioRef.current?.pause();
    setCurrentId(null);
  };

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const newLullaby = {
      id: crypto.randomUUID(),
      title: file.name,
      src: url,
      isCustom: true
    };
    setLullabies(prev => [...prev, newLullaby]);
  };

  const handleDelete = (id) => {
    setLullabies(prev => prev.filter(l => l.id !== id));
  };

  const handleRename = (id, newTitle) => {
    setLullabies(prev => prev.map(l => l.id === id ? { ...l, title: newTitle } : l));
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <X />
        </button>

        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Music size={20} /> Lullabies
        </h2>

        <audio ref={audioRef} className="hidden" />

        {lullabies.map(lullaby => (
          <div key={lullaby.id} className="my-2 border p-2 rounded-lg shadow-sm">
            <div className="flex justify-between items-center gap-2">
              <input
                defaultValue={lullaby.title}
                className="flex-1 border p-1 rounded"
                onBlur={e => handleRename(lullaby.id, e.target.value)}
              />
              <div className="flex gap-2">
                {currentId === lullaby.id ? (
                  <button onClick={stopLullaby} className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">Pause</button>
                ) : (
                  <button onClick={() => playLullaby(lullaby.id, lullaby.src)} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Play</button>
                )}
                {lullaby.isCustom && (
                  <button onClick={() => handleDelete(lullaby.id)} className="text-red-500">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="mt-4">
          <label htmlFor="upload" className="flex items-center gap-2 text-blue-600 cursor-pointer">
            <Upload size={16} /> Upload Lullaby
          </label>
          <input id="upload" type="file" accept="audio/*" className="hidden" onChange={handleUpload} />
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Timer size={16} />
          <input
            type="number"
            placeholder="Sleep timer (mins)"
            value={timer}
            onChange={e => setTimer(Number(e.target.value))}
            className="border p-1 rounded w-32"
          />
        </div>
      </div>
    </div>
  );
}
