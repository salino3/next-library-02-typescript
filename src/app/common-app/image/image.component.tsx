"use client";
import { useAppFunctions } from "@/app/hooks/use-app-functions";

type LazyProps = "lazy" | "eager" | undefined;

interface Props {
  customStyle: string;
  src: string | undefined;
  alt: string | undefined;
  lazy: LazyProps;
  vertical: boolean;
}

export const ImageComponent = (props: Props) => {
  const { customStyle, src, alt, lazy = "lazy", vertical = true } = props;

  const { handleImgError } = useAppFunctions();

  return (
    <div className={`boxImageImageComponent ${customStyle}`}>
      <img
        src={src}
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
          handleImgError(e, vertical)
        }
        loading={lazy}
        alt={alt}
      />
    </div>
  );
};
