"use client";
import { CSSProperties, ReactEventHandler } from "react";
import { useAppFunctions } from "@/app/hooks/use-app-functions";

type LazyProps = "lazy" | "eager" | undefined;

interface Props {
  customStyle?: string;
  src: string | undefined;
  alt: string | undefined;
  lazy?: LazyProps;
  vertical: boolean;
  onLoad?: ReactEventHandler<HTMLImageElement> | undefined;
  style?: CSSProperties | undefined;
}

export const ImageComponent = (props: Props) => {
  const {
    customStyle,
    src,
    alt,
    lazy = "lazy",
    vertical = true,
    onLoad,
    style,
  } = props;

  const { handleImgError } = useAppFunctions();

  return (
    <div style={style} className={`boxImageImageComponent ${customStyle}`}>
      <img
        src={src}
        onLoad={onLoad}
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
          handleImgError(e, vertical)
        }
        loading={lazy}
        alt={alt}
      />
    </div>
  );
};
