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

let curNum = 3;

const extractor = new ColorExtractor();

export default function App() {
  const { imageRef } = useImage();
  const [url, setUrl] = useState("http://blog.xiong35.cn/color-extract/3.jpg");
  const [config, setConfig] = useState<Config>({
    compresionRate: 0.4,
    topColorCount: 6,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [colors, setColors] = useState<ColorInfo[]>([]);

  const [textColor, setTextColor] = useState(["#fff", "#000"]);

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
        setTextColor(extractor.chooseReadableColor());
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

      <input
        type="button"
        value="switch"
        onClick={() => {
          setUrl(
            `http://blog.xiong35.cn/color-extract/${(++curNum % 4) + 1}.jpg`
          );
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
              setConfig({
                ...config,
                topColorCount:
                  Number(e.target.value) >= 2 ? Number(e.target.value) : 2,
              })
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
                compresionRate:
                  Number(e.target.value) / 100 < 0.02
                    ? 0.02
                    : Number(e.target.value) / 100,
              })
            }
          />
        </div>
      </div>

      <div
        className="demo"
        style={{ background: textColor[0], color: textColor[1] }}
      >
        <img src={url} className="demo-image" alt="" />
        <div className="demo-text">
          <div className="demo-title">Lorem ipsum dolor</div>
          <div className="demo-content">
            sit amet consectetur adipisicing elit. Omnis labore perferendis
            aliquid modi qui beatae enim
          </div>
        </div>
      </div>
    </div>
  );
}
