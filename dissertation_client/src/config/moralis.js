import Moralis from "moralis";

export const startMoralisServer = () => {
    const serverUrl = "https://hwu8lbo5klfm.usemoralis.com:2053/server";
    const appId = "qCzZoAO02AZLaGIXy38oiBkd9icAXE4bDdw25Vdx";
    Moralis.start({ serverUrl, appId });
}

 