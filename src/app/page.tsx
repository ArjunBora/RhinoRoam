import { Header, Footer } from "@/components/ui/navigation";
import { ChatWidget } from "@/components/chat/ChatWidget";
import HomePage from "@/components/home/HomePage";

export default function Page() {
  return (
    <>
      <Header />
      <HomePage />
      <Footer />
      <ChatWidget />
    </>
  );
}
