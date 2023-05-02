import styled from "styled-components";

const EmojiSelectorWrapper = styled.ul`
  display: inline-block;
  max-width: 400px;
  border-radius: 8px;
  padding: 12px;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
  background-color: #fff;
`;

const EmojiContentWrapper = styled.li`
  margin-bottom: 8px;
`;
const EmojiContentTitle = styled.div`
  padding: 4px 0;
  font-size: 14px;
  color: #616161;
`;
const EmojiWrapper = styled.div`
  user-select: none;
  border-radius: 4px;
  display: flex;

  & > .ant-btn {
    flex: 1;
  }
`;

const EmojiContent = styled.span`
  font-size: 1.5em;
  border-radius: 4px;
  cursor: pointer;
  width: 1.5em;
  height: 1.5em;
  text-align: center;
  line-height: 1.5em;

  &:hover {
    background-color: #ccc;
  }
`;

const EmojiContentEmpty = styled.span``;

type EmojiArray = ({ emoji: string } | undefined)[];
// TODO: 添加唯一 id
const builtinEmoji: EmojiArray = [
  {
    emoji: "😀",
  },
  {
    emoji: "😃",
  },
  {
    emoji: "😄",
  },
  {
    emoji: "😁",
  },
  {
    emoji: "😆",
  },
  {
    emoji: "😅",
  },
  {
    emoji: "🤣",
  },
  {
    emoji: "🙂",
  },
  {
    emoji: "🙃",
  },
  {
    emoji: "😉",
  },
  {
    emoji: "🤩",
  },
  {
    emoji: "😘",
  },
  {
    emoji: "😗",
  },
  {
    emoji: "😛",
  },
  {
    emoji: "😑",
  },
  {
    emoji: "😶",
  },
  {
    emoji: "😏",
  },
  {
    emoji: "😵",
  },
  {
    emoji: "😈",
  },
  {
    emoji: "👿",
  },
  {
    emoji: "👋",
  },
  {
    emoji: "🖐",
  },
  {
    emoji: "👌",
  },
  {
    emoji: "🤏",
  },
  {
    emoji: "👍",
  },
  {
    emoji: "👎",
  },
  {
    emoji: "👊",
  },
  { emoji: "👏" },
  {
    emoji: "👂",
  },
];

interface EmojiSelectorProps {
  numPerRows?: number;
}
export default function EmojiSelector({ numPerRows = 8 }: EmojiSelectorProps) {
  if (numPerRows < 0 || numPerRows > 8) {
    numPerRows = 8;
  }

  const handleCloseEmojiSelector = (event: any) => {
    event.stopPropagation();
  };

  const renderEmojiArray = builtinEmoji.reduce<EmojiArray[]>((acc, _, i) => {
    if (i % numPerRows === 0) {
      const arr = builtinEmoji.slice(i, i + numPerRows);
      while (arr.length < numPerRows) {
        arr.push(undefined);
      }
      acc.push(arr);
    }

    return acc;
  }, []);

  return (
    <EmojiSelectorWrapper onClick={handleCloseEmojiSelector}>
      <EmojiContentWrapper>
        <EmojiContentTitle>最近使用</EmojiContentTitle>
        <EmojiWrapper>
          {renderEmojiArray.map((_, index) => {
            return (
              <EmojiContent key={index}>
                {
                  builtinEmoji[
                    Math.floor(Math.random() * (builtinEmoji.length + 1))
                  ]?.emoji
                }
              </EmojiContent>
            );
          })}
        </EmojiWrapper>
      </EmojiContentWrapper>
      <EmojiContentWrapper>
        <EmojiContentTitle>所有表情</EmojiContentTitle>
        {renderEmojiArray.map((emojiArray, index) => {
          return (
            <EmojiWrapper key={index}>
              {emojiArray.map((item, index) => {
                return item ? (
                  <EmojiContent key={index}>{item?.emoji}</EmojiContent>
                ) : (
                  <EmojiContentEmpty></EmojiContentEmpty>
                );
              })}
            </EmojiWrapper>
          );
        })}
      </EmojiContentWrapper>
    </EmojiSelectorWrapper>
  );
}
