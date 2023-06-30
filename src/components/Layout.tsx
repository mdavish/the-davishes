import React from "react";
import Nav from "./Nav";
import type { Photo } from "../types/site";
import { Image } from "@yext/pages/components";
import { ChatBot } from "./ChatBot";
import { ChatHeadlessProvider } from "@yext/chat-headless-react";
import { ChatPopUp } from "@yext/chat-ui-react";
import "../index.css";

interface LayoutProps {
  children: React.ReactNode;
  bgPhoto?: Photo;
}

const Layout = ({ children, bgPhoto }: LayoutProps): JSX.Element => {
  return (
    <ChatHeadlessProvider
      config={{
        apiKey: "75eaa2ea1cac07b69efe0a55f260f897",
        botId: "davish-wedding-bot",
        saveToSessionStorage: false,
      }}
    >
      <div className="bg-no-repeat bg-center h-screen relative overflow-auto">
        {/* <ChatBot configId="davish-wedding-v2" /> */}
        <ChatPopUp
          title="Chat with us!"
          stream={false}
          customCssClasses={{
            buttonIcon: "text-white",

            button: "bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900",
            panelCssClasses: {
              messageBubbleCssClasses: {
                bubble__user: "bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900",
              },
              inputCssClasses: {
                sendButton: "bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-sky-900",
                textArea: "border border-gray-300 focus:ring-green-700 focus:border-green-700 text-base",
              }
            },
            headerCssClasses: {
              container: "bg-gradient-to-r from-green-900 to-green-950",
              title: "overflow-hidden",
            }
          }}

        />
        {bgPhoto &&
          <div className="w-full h-full absolute overflow-hidden">
            <div className="w-full h-full select-none absolute lg:-bottom-36 lg:-right-48">
              <Image className="absolute w-full h-full" image={bgPhoto} />
            </div>
          </div>
        }
        <div
          className="bg-cover bg-no-repeat bg-center flex flex-col h-full bg-beige-100 bg-opacity-90 relative"
        >
          <Nav />
          {children}
        </div>
      </div>
    </ChatHeadlessProvider>
  );
};

export default Layout;
