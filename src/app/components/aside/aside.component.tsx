"use client";
import { useProviderSelector } from "@/app/store/provider";
import { useAppFunctions } from "@/app/hooks/use-app-functions";
import "./aside.styles.scss";

export const Aside = () => {
  const { aside } = useProviderSelector("aside");

  const { handleImgError } = useAppFunctions();

  return (
    <aside className={`rootAsideComponent aside_${aside}`}>
      <h3> Aside Component</h3>
      <div className="publicityContainer">
        <div className="boxImage">
          <img
            src="/uy"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
              handleImgError(e, true)
            }
            loading="lazy"
            alt="Advertising Book Layout 1"
          />
        </div>
        <div className="boxImage">
          <img
            src="/uy"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
              handleImgError(e, true)
            }
            loading="lazy"
            alt="Advertising Book Layout 2"
          />
        </div>
      </div>
    </aside>
  );
};
