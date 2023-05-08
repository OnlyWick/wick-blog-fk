import { AlertProps, Button, Divider, Image } from "antd";
import { useState } from "react";
import styled from "styled-components";

const AlbumItemWrapper = styled.div`
  display: flex;
`;

const AlbumItemLeft = styled.div`
  flex: 1;
`;

const AlbumItemRight = styled.div`
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ccc;
`;

const AlbumItemTimeline = styled.div``;
const AlbumItemContent = styled.div`
  /* display: flex;
  flex-wrap: wrap; */
`;

interface AlbumItemImageProps {
  mode?: "thumbnail" | "detail";
}

// const AlbumItemImage = styled.li<AlbumItemImageProps>`
//   /* width: 100%; */
//   width: ${(props) => (props.mode === "thumbnail" ? "auto" : "100%")};

//   @media screen and (max-width: 768px) {
//     & {
//       .ant-image {
//         padding: 0.125rem;
//         width: 33.333%;
//       }
//     }
//   }

//   @media screen and (min-width: 769px) {
//     & {
//       .ant-image {
//         padding: 0.25rem;
//         width: 25%;
//       }
//     }
//   }
// `;

const AlbumItemImage = styled.div<AlbumItemImageProps>`
  /* width: 100%; */
  display: inline-block;
  overflow: hidden;
  padding: 4px;
  box-sizing: border-box;

  & .ant-image {
    position: relative;
  }

  & .ant-image img {
    position: absolute;
    left: 0;
    top: 0;
    object-fit: cover;
    vertical-align: top;
    height: 100%;
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    width: 33.333%;
  }

  @media screen and (min-width: 769px) {
    width: 25%;
  }

  @media screen and (max-width: 768px) {
    & {
      .ant-image {
        padding: 0.125rem;
        width: 100%;
        padding-bottom: 100%;
      }
    }
  }

  @media screen and (min-width: 769px) {
    & {
      .ant-image {
        padding: 0.25rem;
        width: 100%;
        padding-bottom: 100%;
      }
    }
  }
`;

const AlbumItemDay = styled.div`
  margin: 4px;
  color: #bdbdbd;
`;

interface AlbumItemProps {
  mode?: "thumbnail" | "detail";
}

export default function AlbumItem({ mode }: AlbumItemProps) {
  return (
    <AlbumItemWrapper>
      <AlbumItemLeft>
        <AlbumItemTimeline>
          <Divider style={{ margin: "0 0 4px" }} plain>
            4 月
          </Divider>
        </AlbumItemTimeline>
        <AlbumItemContent>
          <Image.PreviewGroup>
            {mode === "detail" && <AlbumItemDay>今天</AlbumItemDay>}
            <AlbumItemImage mode={mode}>
              <Image src="/freddie.jpg"></Image>
            </AlbumItemImage>
            {mode === "detail" && <AlbumItemDay>昨天</AlbumItemDay>}
            <AlbumItemImage mode={mode}>
              <Image src="/freddie.jpg"></Image>
            </AlbumItemImage>
            {mode === "detail" && <AlbumItemDay>今天</AlbumItemDay>}
            <AlbumItemImage mode={mode}>
              <Image src="/freddie.jpg"></Image>
            </AlbumItemImage>
          </Image.PreviewGroup>
        </AlbumItemContent>
      </AlbumItemLeft>
    </AlbumItemWrapper>
  );
}
