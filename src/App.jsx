import { TonConnectUIProvider, useTonConnectUI } from '@tonconnect/ui-react';
import { beginCell, Address } from '@ton/core';

const COLLECTION =
  import.meta.env.VITE_COLLECTION_ADDRESS ||
  "EQCHhJ3uh07AyJ9Q4U5hk71ykvULGtzNl1oJJ4Uk76UW3ptb";

// ── BUILD PAYLOAD ──
function buildMintPayload(index, owner) {
  const content = beginCell()
    .storeStringTail(
      `${import.meta.env.VITE_API_BASE}/api/mint/meta/${index}`
    )
    .endCell();

  return beginCell()
    .storeUint(index, 64)
    .storeAddress(Address.parse(owner))
    .storeRef(content)
    .endCell()
    .toBoc()
    .toString("base64");
}

// ── INNER APP ──
function InnerApp() {
  const [tonConnectUI] = useTonConnectUI();

  async function mint() {
    try {
      const index = Date.now();

      // отправляем tx (кошелёк сам откроется)
      await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 600,
        messages: [
          {
            address: COLLECTION,
            amount: "50000000", // 0.05 TON gas
            payload: buildMintPayload(index, tonConnectUI.account?.address)
          }
        ]
      });

      alert("Mint sent!");
    } catch (e) {
      console.error(e);
      alert("Mint failed");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>TON NFT Mint</h1>

      <button onClick={mint}>
        Mint NFT
      </button>
    </div>
  );
}

// ── ROOT APP ──
export default function App() {
  return (
    <TonConnectUIProvider
      manifestUrl="https://deploy-insho36gk-mintsims-projects-ae9861fe.vercel.app/tonconnect-manifest.json"
    >
      <InnerApp />
    </TonConnectUIProvider>
  );
}