import Navigation from "@/components/nav/nav.tsx";
import HomeContainer from "@/components/homeContainer/homeContainer.tsx";
import Footer from "@/components/footer/footer.tsx";

export default function Home() {
  return (
    <>
      <div className="z-z2 flex min-h-100vh w-full flex-col items-center bg-beige">
        <Navigation />
        <HomeContainer />
        <Footer />
      </div>
    </>
  );
}
