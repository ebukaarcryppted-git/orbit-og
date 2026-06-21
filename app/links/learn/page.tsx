import CategoryView from "@/components/CategoryView";
import { categories } from "@/lib/links";

export default function LearnCategoryPage() {
  return <CategoryView category={categories.learn} />;
}
