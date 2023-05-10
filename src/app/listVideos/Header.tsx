import { AppBar, Toolbar, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SiBuymeacoffee, SiPlayerfm } from 'react-icons/si';
import { RiVideoUploadFill } from 'react-icons/ri';
import { MdGeneratingTokens } from 'react-icons/md'
import { getInstance } from '../upload/page';
import { getTokenInstance } from './page';
import { AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle, AiFillShopping } from 'react-icons/ai'


const Header = () => {

    const [token, setToken] = useState(1000000000000000000);
    const [balance, setBalance] = useState(0);
    const [showBuyModal, setShowBuyModal] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const { instance, accounts } = await getTokenInstance();
            const balance = await instance?.methods?.balanceOf(accounts[0]).call();
            setBalance(balance);
        };

        fetchData();
    }, []);

    function showTokenModal() {
        setShowBuyModal(true);
    }

    const buyToken = async () => {
        const { instance, accounts } = await getTokenInstance();
        const buy = await instance?.methods?.mint().send({ value: token, from: accounts[0] });
        console.log("---buy", buy);
    }


    return (
        <div className='bg-slate-700'>
            <AppBar style={{ background: '#2E3B55' }} position="static" className='bg-slate-700'>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                        onClick={() => {
                            router.push('/dapp')
                        }}
                        className="bg-blue-500 hover:bg-blue-700 text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center"
                    >
                        <SiPlayerfm />
                        <p className="ml-2">Decentralized-YT</p>
                    </button>


                    <p className='text-xl text-gray-100 dark:text-white ms-auto mr-5'>You have {balance} TTM Tokens.</p>

                    {/* <Button href="/contact" color="inherit">BUY?</Button> */}
                    <button
                        onClick={() => {
                            showTokenModal();
                        }}
                        className="bg-blue-500 hover:bg-blue-700 text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center"
                    >
                        <MdGeneratingTokens />
                        <p className="ml-2">Buy?</p>
                    </button>
                    <button
                        onClick={async () => {
                            await router.push('/upload');
                        }}
                        className="bg-blue-500 ms-5 hover:bg-blue-700 text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center"
                    >
                        <RiVideoUploadFill />
                        <p className="ml-2">Upload Video</p>
                    </button>
                </Toolbar>
            </AppBar>
            <div>
                {showBuyModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="p-5 border-b rounded-t text-gray-700 flex items-center">
                                        <div className="flex text-3xl">
                                            <AiFillShopping />
                                            <span className="text-1xl text-gray-700 font-semibold">
                                                Buy TTM Token Using Eth Token.
                                            </span>
                                        </div>
                                        <button
                                            className="flex text-3xl ml-auto ms-10"
                                            onClick={() => setShowBuyModal(false)}
                                        >
                                            <AiFillCloseCircle />
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 flex-auto justify-center text-center">
                                        <p className="my-4 text-slate-500 text-base leading-relaxed text-center">
                                            Enter the amount of tokens you want to buy.
                                        </p>
                                        <p className="my-4 text-slate-500 text-base leading-relaxed text-center">
                                            1 TTM Token = 1 Wei Token
                                        </p>
                                        <p className="my-4 text-slate-500 text-base leading-relaxed text-center">
                                            Enter TTM Tokens below
                                        </p>
                                        <div className="flex flex-row items-center ms-20">
                                            <div className="flex flex-row items-center space-x-2">
                                                <button
                                                    onClick={() => {
                                                        setToken(token - 1);
                                                    }}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                                                >
                                                    <AiFillMinusCircle />
                                                </button>
                                                <div className="flex items-center justify-center">
                                                    <textarea style={{ height: '45px' }} className="text-3xl w-full p-2 rounded-lg border-gray-300" type="number"
                                                        inputMode="numeric"
                                                        value={token}
                                                        onChange={(event) => {
                                                            setToken(parseInt(event.target.value));
                                                        }}></textarea>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setToken(token + 1);
                                                    }}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                                                >
                                                    <AiFillPlusCircle />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="my-4 text-slate-500 text-base leading-relaxed text-center">
                                            Equivalent Eth Value = {token / 1000000000000000000}
                                        </p>
                                    </div>

                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={async () => {
                                                await buyToken();
                                                setShowBuyModal(false);
                                                window.location.reload();
                                            }}
                                        >
                                            Buy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null
                }
            </div>
        </div>
    )
}

export default Header;