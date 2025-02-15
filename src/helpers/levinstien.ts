import { curlCommands } from "@/constants";
import pool from "./db";

// تابع محاسبه فاصله Levenshtein
export const levenshteinDistance = (a: string, b: string): number => {
  const dp: number[][] = Array(a.length + 1)
    .fill(null)
    .map(() => Array(b.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // حذف
        dp[i][j - 1] + 1, // درج
        dp[i - 1][j - 1] + cost // جایگزینی
      );
    }
  }

  return dp[a.length][b.length];
};




// تابع جستجوی نزدیک‌ترین مقدار
// export const searchCurl = async (userInput: string): Promise<string> => {
//   const query = `
//     SELECT command
//     FROM curl_commands
//     ORDER BY levenshtein(command, $1) ASC
//     LIMIT 1;
//   `;

//   try {
//     const { rows } = await pool.query(query, [userInput]);
//     return rows.length > 0 ? rows[0].command : "No match found";
//   } catch (error) {
//     console.error("Error searching for curl command:", error);
//     return "Error searching database";
//   }
// };
