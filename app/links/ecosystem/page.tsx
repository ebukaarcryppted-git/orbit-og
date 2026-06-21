import CategoryView from "@/components/CategoryView";
import { categories } from "@/lib/links";

export default function EcosystemCategoryPage() {
  return <CategoryView category={categories.ecosystem} />;
}
