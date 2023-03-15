import QRCode from 'qrcode.react';

function QrCodeItem({ value, size, id }: { value: string; id: string; size?: number }) {
  return <QRCode value={value} size={size} id={id} />;
}

export default QrCodeItem;
