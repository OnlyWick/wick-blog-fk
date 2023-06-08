import { CommentContext } from "@/stories/Comment/CommentContext";
import { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { isWeakMap } from "util/types";

const EmojiSelectorWrapper = styled.ul`
  display: inline-block;
  max-width: 400px;
  border-radius: 8px;
  padding: 12px;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
  background-color: #fff;
  min-width: 225px;

  /* @media screen and (max-width: 768px) {
    width: 225px;
  } */
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

const EmojiContent = styled.span<{ hoverable?: boolean }>`
  font-size: 1.8em;
  border-radius: 4px;
  width: 1.5em;
  height: 1.5em;
  text-align: center;
  line-height: 1.5em;
  transition: var(--wick-transition-time);

  ${(props) =>
    props.hoverable
      ? `
        cursor: pointer;
        &:hover {
          background-color: #ccc;
          transform: scale(1.2);
        }
        `
      : null}
`;

export type EmojiType = { content: string; id: string };
export type EmojiArrayType = (EmojiType | undefined)[];
interface EmojiSelectorProps {
  emojiList: EmojiArrayType;
  onEmojiSelect?: (data?: string) => void;
  numPerRows?: number;
}

export default function EmojiSelector({
  numPerRows = 8,
  emojiList,
}: EmojiSelectorProps) {
  const storageItemName = "emoji-queue";
  const [recentUseEmoji, setRecentUseEmoji] = useState<
    Required<EmojiArrayType> | []
  >([]);

  const context = useContext(CommentContext);

  if (numPerRows < 0 || numPerRows > 8) {
    numPerRows = 8;
  }

  const handleCloseEmojiSelector = (event: any) => {
    event.stopPropagation();
  };

  const renderEmojiArray =
    emojiList &&
    emojiList.reduce<EmojiArrayType[]>((acc, _, i) => {
      if (i % numPerRows === 0) {
        const arr = emojiList.slice(i, i + numPerRows);
        while (arr.length < numPerRows) {
          arr.push(undefined);
        }
        acc.push(arr);
      }

      return acc;
    }, []);

  useEffect(() => {
    const queue = localStorage.getItem(storageItemName);
    setRecentUseEmoji(queue === null ? [] : JSON.parse(queue));
  }, []);

  const handleEmojiClick = useCallback(
    (emoji: EmojiType) => {
      const handlePushEmojiToQueue = (emoji: EmojiType) => {
        let isExistQueue = localStorage.getItem(storageItemName);
        let queue: Required<EmojiArrayType>;

        if (isExistQueue === null) {
          queue = [];
          queue.push(emoji);
          localStorage.setItem(storageItemName, JSON.stringify(queue));
          setRecentUseEmoji((preArray) => [...preArray, emoji]);
          return;
        }

        queue = JSON.parse(isExistQueue);
        if (queue.length > numPerRows - 1) {
          let isSwap = true;
          for (let i = 0; i < queue.length; i++) {
            if (queue[i]?.id === emoji.id) {
              const temp = queue[0];
              queue[0] = queue[i];
              queue[i] = temp;
              isSwap = false;
            }
          }

          if (isSwap) {
            queue.unshift(emoji);
            queue.pop();
          }
        } else {
          queue.push(emoji);
        }

        localStorage.setItem(storageItemName, JSON.stringify(queue));
        setRecentUseEmoji(queue);
      };
      handlePushEmojiToQueue(emoji);
      context && context.onEmojiSelect && context.onEmojiSelect(emoji.content);
    },
    [context, numPerRows]
  );

  return (
    <EmojiSelectorWrapper onClick={handleCloseEmojiSelector}>
      {recentUseEmoji && recentUseEmoji.length !== 0 && (
        <EmojiContentWrapper>
          <EmojiContentTitle>最近使用</EmojiContentTitle>
          <EmojiWrapper>
            {recentUseEmoji.map((emoji, index) => {
              return (
                <EmojiContent
                  hoverable={true}
                  onClick={() =>
                    context &&
                    context.onEmojiSelect &&
                    context.onEmojiSelect(emoji.content)
                  }
                  key={`${emoji!.id}`}
                >
                  {emoji!.content}
                </EmojiContent>
              );
            })}
          </EmojiWrapper>
        </EmojiContentWrapper>
      )}
      <EmojiContentWrapper>
        <EmojiContentTitle>所有表情</EmojiContentTitle>
        {renderEmojiArray.map((emojiArray, index) => {
          return (
            <EmojiWrapper key={`all-emoji-${emojiArray[index]!.id}`}>
              {emojiArray.map((emoji, index) => {
                return (
                  <EmojiContent
                    key={`${emoji === undefined ? index : emoji.id}`}
                    hoverable={emoji !== undefined}
                    dangerouslySetInnerHTML={{
                      __html: emoji === undefined ? "" : emoji.content,
                    }}
                    onClick={() =>
                      emoji !== undefined && handleEmojiClick(emoji)
                    }
                  ></EmojiContent>
                );
              })}
            </EmojiWrapper>
          );
        })}
      </EmojiContentWrapper>
    </EmojiSelectorWrapper>
  );
}
