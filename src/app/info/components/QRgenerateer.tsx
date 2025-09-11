import { QRCodeCanvas } from 'qrcode.react';
type Props={
    qr:string,
    size:number,
}
export default function QRGenerator({qr,size}:Props) {
  return (
    <div className='p-3 w-full aspect-square bg-white rounded-xl shadow-2xl backdrop:blur-2xl flex justify-center items-center'>
      <div className=''>
        <QRCodeCanvas value={qr} size={size} />
      </div>
        
    </div>
  );
}