/** @format */
import lace from "../../../public/lace.png";
import yoroi from "../../../public/yoroi.png";
import eternl from "../../../public/etemi.png";
import gero from "../../../public/gero.png";
import begin from "../../../public/begin.png";
import vespr from "../../../public/verspr.png";
import tokeo from "../../../public/tokeo.jpg";


export type WalletMeta = {
  id: string; 
  label: string;
  logo: string; 
  installUrl: string;
};
type ListedWallet = WalletMeta & { installed: boolean };

export const WALLET_REGISTRY: WalletMeta[] = [
  {
    id: "lace",
    label: "Lace",
    logo: lace.src,
    installUrl: "https://www.lace.io/",
  },
  {
    id: "yoroi",
    label: "Yoroi",
    logo: yoroi.src,
    installUrl: "https://yoroi-wallet.com/",
  },
  {
    id: "eternl",
    label: "Eternl",
    logo: eternl.src,
    installUrl: "https://eternl.io/",
  },
  {
    id: "gerowallet",
    label: "Gero",
    logo: gero.src,
    installUrl: "https://gerowallet.io/",
  },
  {
    id: "begin",
    label: "Begin",
    logo: begin.src,
    installUrl: "https://begin-wallet.com/",
  },
  {
    id: "vespr",
    label: "Vespr",
    logo: vespr.src,
    installUrl: "https://vespr.xyz/",
  },
  {
    id: "tokeo",
    label: "Tokeo",
    logo: tokeo.src,
    installUrl: "https://typhonwallet.io/",
  },
];
