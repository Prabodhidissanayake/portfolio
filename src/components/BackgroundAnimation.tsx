"use client";

import { Player } from "@lottiefiles/react-lottie-player";

export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-pink-900/20 animate-pulse"></div>

      <div
        className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 dark:bg-blue-800/30 rounded-full animate-bounce"
        style={{ animationDelay: "0s", animationDuration: "3s" }}
      ></div>
      <div
        className="absolute top-40 right-20 w-16 h-16 bg-purple-200/30 dark:bg-purple-800/30 rounded-full animate-bounce"
        style={{ animationDelay: "1s", animationDuration: "4s" }}
      ></div>
      <div
        className="absolute bottom-40 left-20 w-24 h-24 bg-pink-200/30 dark:bg-pink-800/30 rounded-full animate-bounce"
        style={{ animationDelay: "2s", animationDuration: "5s" }}
      ></div>
      <div
        className="absolute bottom-20 right-10 w-18 h-18 bg-indigo-200/30 dark:bg-indigo-800/30 rounded-full animate-bounce"
        style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}
      ></div>

      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <Player
          autoplay
          loop
          src="/animations/background-animation.json"
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </div>
  );
}
