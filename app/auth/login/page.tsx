
import Loginform from '../../components/Loginform/loginform';
import Image from 'next/image';


export default function Login() {

    
  return (
      <div className='grid grid-cols-12 bg-[#E9ECF2] min-h-screen w-full overflow-hidden relative'>

      <div className='relative w-full col-span-12 lg:col-span-5 flex flex-col justify-start items-center p-3 space-y-6'>
        <Image src='/Ellipse2487.png' alt='ellipse 1' width={1150} height={507} className='ellipse1 absolute right-0 bottom-0' />
        <Image src='/Ellipse2486.png' alt='ellipse 2' width={1150} height={507} className='ellipse1 absolute top-0 left-0' />
        <div className=' w-full flex flex-col items-center block lg:hidden'>
            <Image src='/meetuslogo.png' alt='meetuslogo' objectFit='object-contain'  width={130} height={70} className='-mb-8'/>
            <Image src='/meetusname.png' alt='meetuslogo' objectFit='object-contain'  width={110} height={75} className='mx-auto'/>
        </div>
        <Loginform />
      </div>
        <div className="col-span-7 hidden lg:flex justify-center">
        <div className="flex flex-col items-center m-0 p-0">
          
        <Image src='/1.png' alt='ellipse 1' width={1150} height={507} className='ellipse1 absolute right-0 top-0' />
        <Image src='/Ellipse2488.png' alt='ellipse 2' width={1150} height={507} className='ellipse1 absolute bottom-0' />
            <div className="-mb-[18rem]">
            <Image
                src="/meetuslogo.png"
                alt="meetuslogo"
                width={744}
                height={523}
                className="block"
                objectFit="contain"
            />
            </div>
            
            <div>
            <Image
                src="/meetusname.png"
                alt="meetusname"
                width={413}
                height={75}
                className="block"
                objectFit="contain"
            />
            </div>
            
        </div>
        </div>



    </div>
  )
}
