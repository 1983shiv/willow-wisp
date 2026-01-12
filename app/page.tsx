import { HeroHome } from "@/components/hero-home";
import JoinWisp from "@/components/join-the-wisp";
import { FeaturedCategories } from "@/components/featured-categories";

export default function Home() {
  return (
    <main>
        <HeroHome />
        <FeaturedCategories />
        <JoinWisp />
    </main>
  );
}
