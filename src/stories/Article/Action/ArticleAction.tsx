import { ArrowUpIcon, CommentIcon } from "@/stories/Common/icon";
import ArrowDownIcon from "@/stories/Common/icon/ArrowDownIcon";
import Share from "@/stories/Common/icon/Share";
import { Button, Divider, QRCode } from "antd";
import { BaseSyntheticEvent, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const ArticleActionWrapper = styled.div`
  display: inline-flex;
  position: relative;
  flex-direction: column;
  color: #aaa;
  text-align: center;
`;

const ArticleActionItem = styled.div`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 8px;
  transition: all 0.35s;
  position: relative;

  &:hover {
    color: aqua;
  }
`;

const ArticleActionVoteCount = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

interface ArticleActionQRCodeProps {
  show?: boolean;
}

const ArticleActionQRCode = styled.div<ArticleActionQRCodeProps>`
  display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  width: 200px;
  height: 200px;
  right: 100%;
  z-index: 100;
  top: 0;
`;

interface ArticleActionProps {
  voteCount?: number;
  onVoteUp?: (id: string) => void;
  onVoteDown?: (id: string) => void;
}

export default function ArticleAction({
  voteCount = 0,
  onVoteUp,
  onVoteDown,
}: ArticleActionProps) {
  const [showQRCode, setShowQRCode] = useState(false);
  const [href, setHref] = useState("");
  const handleGenerateQrCode = useCallback(
    (e: BaseSyntheticEvent) => {
      e.stopPropagation();
      setShowQRCode(!showQRCode);
    },
    [showQRCode]
  );

  const handleVoteUp = () => {
    onVoteUp && onVoteUp("");
  };

  const handleVoteDown = () => {
    onVoteDown && onVoteDown("");
  };

  useEffect(() => {
    setHref(window.location.href);
    const cancelShowQRCode = () => {
      setShowQRCode(false);
    };
    window.addEventListener("click", cancelShowQRCode);

    return () => {
      window.removeEventListener("click", cancelShowQRCode);
    };
  }, []);

  return (
    <ArticleActionWrapper>
      <ArticleActionItem>
        <Button
          type="link"
          onClick={handleVoteUp}
          icon={<ArrowUpIcon />}
        ></Button>
      </ArticleActionItem>
      <ArticleActionVoteCount>{voteCount}</ArticleActionVoteCount>
      <ArticleActionItem>
        <Button
          type="link"
          onClick={handleVoteDown}
          icon={<ArrowDownIcon />}
        ></Button>
      </ArticleActionItem>
      <ArticleActionItem>
        <CommentIcon></CommentIcon>
      </ArticleActionItem>
      <Divider
        style={{
          margin: "0 0 8px",
        }}
        type="horizontal"
      ></Divider>
      <ArticleActionItem onClick={handleGenerateQrCode}>
        <Share></Share>
        <ArticleActionQRCode
          show={showQRCode}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <QRCode value={href}></QRCode>
        </ArticleActionQRCode>
      </ArticleActionItem>
    </ArticleActionWrapper>
  );
}
