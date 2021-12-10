import "./App.scss";

import { useEffect, useState } from "react";
import { ColorExtractor } from "image-color-extraction";

import { file2DataUrl } from "./utils/file2DataUrl";
import { useImage } from "./hooks/useImage";

type Config = {
  compresionRate: number;
  topColorCount: number;
};
type ColorInfo = {
  color: string;
  count: number;
};

const extractor = new ColorExtractor();

export default function App() {
  const { imageRef } = useImage();
  const [url, setUrl] = useState("");
  const [config, setConfig] = useState<Config>({
    compresionRate: 0.4,
    topColorCount: 6,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [colors, setColors] = useState<ColorInfo[]>([]);

  useEffect(() => {
    extractor.setConfig(config);
    if (!imageRef.current) return;
    if (isProcessing) return;

    setIsProcessing(true);

    extractor
      .extractColor(imageRef.current)
      .then(() => {
        console.log(extractor.colors);
        setColors(extractor.colors || []);
      })
      .then(() => setIsProcessing(false));
  }, [config, url]);

  return (
    <div className="main">
      {url && <img className="image" ref={imageRef} src={url} alt="" />}
      <input
        className="image-select"
        type="file"
        onChange={async (e) => {
          if (e.target.files && e.target.files[0]) {
            const url = await file2DataUrl(e.target.files[0]);
            setUrl(url.toString());
          }
        }}
      />

      {isProcessing && <h2>Processing...</h2>}

      <div className="color">
        {colors.map((c) => (
          <div className="color-item">
            <div
              className="color-item-block"
              style={{ background: c.color }}
            ></div>
            {c.count}
          </div>
        ))}
      </div>

      <div className="settings">
        <div className="settings-color_count">
          <div>top color count: {config.topColorCount}</div>
          <input
            className="settings-color_count-input"
            type="number"
            value={config.topColorCount}
            onChange={(e) =>
              setConfig({ ...config, topColorCount: Number(e.target.value) })
            }
          />
        </div>
        <div className="settings-rate">
          <div>compresion rate: {config.compresionRate}</div>
          <input
            type="range"
            className="settings-rate-input"
            value={config.compresionRate * 100}
            onChange={(e) =>
              setConfig({
                ...config,
                compresionRate: Number(e.target.value) / 100,
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
