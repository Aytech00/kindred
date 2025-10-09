/** @format */
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/ui/select";
import { useState } from "react";
export default function IssueCategoryField() {
  const [category, setCategory] = useState<string>("");

  return (
    <div>
      <label className="block text-sm text-gray-700 mb-1">Issue Category</label>

      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="account">Account / Access</SelectItem>
          <SelectItem value="staking">Staking</SelectItem>
          <SelectItem value="wallet">Wallet / Transactions</SelectItem>
          <SelectItem value="bug">Bug / Unexpected Behavior</SelectItem>
          <SelectItem value="feedback">General Feedback</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>

      {/* Make Select 'required' for native form validation */}
      <input type="hidden" name="issueCategory" value={category} required />
    </div>
  );
}
