import CategoryView from "@/components/CategoryView";
import { categories } from "@/lib/links";

export default function SocialCategoryPage() {
  return <CategoryView category={categories.social} />;
}
