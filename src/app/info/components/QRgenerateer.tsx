import { QRCodeCanvas } from 'qrcode.react';
type Props={
    qr:string
}
export default function QRGenerator({qr}:Props) {
  return (
    <div className='p-3 bg-white/20 shadow-2xl backdrop:blur-2xl'>
        <QRCodeCanvas value={qr} size={200} />
    </div>
  );
}