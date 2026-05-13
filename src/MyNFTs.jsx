useEffect(() => {
  if (!walletAddress) return;

  fetch(`${API_BASE}/api/nft/check/${walletAddress}`)
    .then(r => r.json())
    .then(d => setNfts(d.nfts || []));
}, [walletAddress]);
<div>
  Status: {nft.status}
</div>