/** @format */
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/shared/ui/select";
import { useState } from "react";
import { CATEGORIES } from "../server/schema";
export default function IssueCategoryField() {
  function formatCategoryLabel(value: string) {
    switch (value) {
      case "account":
        return "Account / Access";
      case "staking":
        return "Staking";
      case "wallet":
        return "Wallet / Transactions";
      case "bug":
        return "Bug / Unexpected Behavior";
      case "feedback":
        return "General Feedback";
      case "other":
        return "Other";
      default:
        return value;
    }
  }

  const [category, setCategory] = useState<string>("");

  return (
    <div>
      <label className="block text-sm text-gray-700 mb-1">Issue Category</label>

      <Select value={category} name="category" onValueChange={setCategory}>
        <SelectTrigger className="w-full rounded-md">
          <SelectValue placeholder="Choose a category" />
        </SelectTrigger>
        <SelectContent>
          {CATEGORIES.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {formatCategoryLabel(cat)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <input type="hidden" name="issueCategory" value={category} required />
    </div>
  );
}
