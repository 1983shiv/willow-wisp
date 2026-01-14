import { HeroHome } from "@/components/hero-home";
import JoinWisp from "@/components/join-the-wisp";
import { FeaturedCategories } from "@/components/featured-categories";
import Search from "@/components/Search";

export default function Home() {
  return (
    <main>
        <HeroHome />
        <Search />
        <FeaturedCategories />
        <JoinWisp />
    </main>
  );
}
