import { Box, Avatar, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}
const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  return role == "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#17394a",
        gap: 2,
        borderRadius: 2,
        my: 1,
        color: "#eef7f2",
      }}
    >
        <Avatar sx={{ ml: "0", bgcolor: "#5ee8d0", color: "#071522", width: 34, height: 34, fontSize: 14 }}>C</Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "16px", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkDark} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: "16px", lineHeight: 1.65, whiteSpace: "pre-wrap" }} key={block}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#102b3a",
        gap: 2,
        borderRadius: 2,
        color: "#eef7f2",
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "#ffb870", color: "#071522", width: 34, height: 34, fontSize: 14 }}>Y</Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "16px", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkDark} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: "16px", lineHeight: 1.65, whiteSpace: "pre-wrap" }} key={block}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;