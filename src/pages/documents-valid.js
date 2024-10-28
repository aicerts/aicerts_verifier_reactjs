import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Form, Row, Col, Card, Modal, ProgressBar, Button} from 'react-bootstrap';
import Link from 'next/link';
import { toPng } from 'html-to-image';
import Head from 'next/head';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';

    // @ts-ignore: Implicit any for children prop
    const DocumentsValid = ({ handleFileChange, apiData, isLoading }) => {
        const [progress, setProgress] = useState(0);
        const certificateRef = useRef(null);
        const [certificateImage, setCertificateImage] = useState(null);
        const [shareModal, setShareModal] = useState(false);
        const [copied, setCopied] = useState(false);

        const handleClose = () => setShareModal(false);

        useEffect(() => {
            if (isLoading) {
                const interval = setInterval(() => {
                    setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 10 : 100));
                }, 500);

                return () => clearInterval(interval);
            } else {
                setProgress(0);
            }
        }, [isLoading]);

        useEffect(() => {
            if (certificateRef.current) {
                toPng(certificateRef.current)
                    .then((dataUrl) => {
                        // @ts-ignore: Implicit any for children prop
                        setCertificateImage(dataUrl);
                    })
                    .catch((error) => {
                        // console.error('Error generating certificate image:', error);
                    });
            }
        }, [apiData]);

        const handleLogoClick = () => {
            window.location.reload();
        };

                        // @ts-ignore: Implicit any for children prop

        const ensureHttp = (url) => {
            if (!url) return '';
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
              return `http://${url}`;
            }
            return url;
          };


        // const shareValue = apiData?.Details["Polygon URL"];

        // const copyToClipboard = () => {
        //     navigator.clipboard.writeText(shareValue).then(() => {
        //         setCopied(true)
        //         setTimeout(() => setCopied(false), 3000);
        //     }).catch(err => {
        //         // console.error('Failed to copy text: ', err);
        //     });
        // };

        // @ts-ignore: Implicit any for children prop
        const formatDate = (dateString) => {
            if (!dateString) return '';

            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Invalid Date';

            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const year = date.getFullYear();

            return `${month}/${day}/${year}`;
        };

       
        
    const shareTitle =  apiData?.message || "Certs365 Blockchain Based Secured Document Verification Platform";

    const title = 'Certs365 Blockchain Based Secured Document Verification Platform';
    const description = "Online authenticity verification of certificates and documents is simple with Cert365. Our platform for blockchain-based certificate verification is user-friendly and safe.";
    const image = 'https://images.netcomlearning.com/ai-certs/cer365AllPageBg.png';
    const imageUrl = process.env.NEXT_PUBLIC_BASE_URL_IMAGE;
 

    // const imageUrl = apiData?.Details && `https://testverify.certs365.io/api/og?certificatenumber=${apiData?.Details['Certificate Number']}&coursename=${apiData?.Details['Course Name']}&grantdate=${(apiData?.Details['Grant Date'] || apiData?.Details['grantDate'])}&expirationdate=${(apiData?.Details['Expiration Date'] || apiData?.Details['expirationDate'])}&name=${apiData?.Details['Name']}`;
    // const certificateUrl = `https://testverify.certs365.io/certificate/${apiData?.Details['Certificate Number']}?certificatenumber=${apiData?.Details['Certificate Number']}&coursename=${apiData?.Details['Course Name']}&grantdate=${(apiData?.Details['Grant Date'] || apiData?.Details['grantDate'])}&expirationdate=${(apiData?.Details['Expiration Date'] || apiData?.Details['expirationDate'])}&name=${apiData?.Details['Name']}`;
    let shareUrl = apiData?.Details?.url || "";
    if(shareUrl) {
         shareUrl = shareUrl.replace('/verify-documents', '');
    }
    return (
        <>
          
           <Head>
           <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:secure_url" content={imageUrl} />
                <meta property="og:url" content={shareUrl} />
                <meta property="og:type" content='website' />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={imageUrl} />
                <meta name="description" content={description} />

            </Head>

            <div className='page-bg'>
                <div className='position-relative h-100'>
                    <div className='vertical-center verify-cert'>
                        <div className='container-fluid'>
                            <Row className="justify-content-center mt-4 verify-documents">
                                <h1 className='title text-center'>{shareTitle}</h1>
                                <Col xs={{ span: 12 }} md={{ span: 10 }}>
                                    <Card className='p-0 p-md-4'>
                                        <Row className='justify-content-center'>
                                            <Col xs={{ span: 12 }} md={{ span: 12 }}>
                                                {apiData?.Details ? (
                                                    <>
                                                        <Card ref={certificateRef} className='valid-cerficate-info'>
                                                            <Card className='dark-card position-relative'>
                                                                <div className='d-block d-lg-flex justify-content-between align-items-center certificate-internal-info'>
                                                                    <div className='badge-banner'>
                                                                        <Image
                                                                            src="/backgrounds/varified-certificate-badge.gif"
                                                                            layout='fill'
                                                                            objectFit='contain'
                                                                            alt='Badge Banner'
                                                                        />
                                                                    </div>
                                                                    <div className='hash-info'>
                                                                        <Row className='position-relative'>
                                                                            <Col className='border-right' xs={{ span: 12 }} md={{ span: 6 }}>
                                                                                <div className='hash-title'>Certification Number</div>
                                                                                <div className='hash-info'>{apiData?.Details['Certificate Number'] ? apiData?.Details['Certificate Number'] : apiData?.Details['Certification Number'] || apiData?.Details['certificateNumber']}</div>
                                                                            </Col>
                                                                            <Col xs={{ span: 12 }} md={{ span: 6 }}>
                                                                                <div className='hash-title'>Certification Name</div>
                                                                                <div className='hash-info'>{apiData?.Details['Course Name'] ? apiData?.Details['Course Name'] : apiData?.Details['Certification Name'] || apiData?.Details['course']}</div>
                                                                            </Col>
                                                                            <hr />
                                                                            <hr className='vertical-line' />
                                                                        </Row>
                                                                    </div>
                                                                </div>
                                                            </Card>

                                                            <div className='cerficate-external-info d-block d-lg-flex justify-content-between align-items-center text-md-left text-center mb-md-0 mb-4'>
                                                                <div className='details'>
                                                                    <div className='heading'>Name</div>
                                                                    <div className='heading-info'>{apiData?.Details['Name'] || apiData?.Details['name']}</div>
                                                                </div>
                                                                <div className='details'>
                                                                    <div className='heading'>Grant Date</div>
                                                                    <div className='heading-info'>{formatDate(apiData?.Details['Grant Date'] || apiData?.Details['grantDate'])}</div>
                                                                </div>
                                                                <div className='details'>
                                                                    <div className='heading'>Expiration Date</div>
                                                                    <div className='heading-info'>
                                                                        {apiData?.Details['Expiration Date'] === "1" || apiData?.Details['expirationDate'] === "1" ? "-" : formatDate(apiData?.Details['Expiration Date'] || apiData?.Details['expirationDate']) || 'No Expiration Date available'}
                                                                    </div>
                                                                </div>

                                                                <div className='details varification-info'>
                                                                    <Button href={apiData?.Details['Polygon URL'] ? ensureHttp(apiData?.Details['Polygon URL']) : ensureHttp(apiData?.Details['Verify On Blockchain'])} target="_blank" className='heading-info' variant="primary">
                                                                        Verify on Blockchain
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                        <div className='d-flex justify-content-center mt-4'>
                                                        <p className='share-text'>Share Your Certificate:</p>
                                                        </div>
                                                        <div className='d-flex justify-content-center align-items-center '>
                                                            <FacebookShareButton style={{marginRight:"5px"}} url={shareUrl} title={shareTitle} className='mr-2'>
                                                                <FacebookIcon size={32} round />
                                                            </FacebookShareButton>
                                                            <TwitterShareButton style={{marginRight:"5px"}} url={shareUrl} title={shareTitle} className='mr-2'>
                                                                <TwitterIcon size={32} round />
                                                            </TwitterShareButton>
                                                            <LinkedinShareButton style={{marginRight:"5px"}} url={shareUrl} title={shareTitle} className='mr-2'>
                                                                <LinkedinIcon size={32} round />
                                                            </LinkedinShareButton>
{/* <button onClick={()=>{handleShare()}}>
    share
</button> */}
                                                        </div>
                                                        {/* <button onClick={()=>{handleShare()}}>share</button> */}
                                                        <div className='d-flex justify-content-center'>
                                                        <hr className='horizontal-line-cert'/>
                                                        </div>
                                                        <Form className='p-4 p-md-0'>
                                                            <div className='d-flex justify-content-center align-items-center'>
                                                                <Link href="/" onClick={handleLogoClick} className="golden-upload valid-again">Validate Another</Link>
                                                            </div>
                                                            <div className='information text-center'>
                                                                Only <strong>PDF</strong> is supported. <br /> (Upto 2 MB)
                                                            </div>
                                                        </Form>
                                                      
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className='badge-banner'>
                                                            <Image
                                                                src="/backgrounds/invalid-certificate.gif"
                                                                layout='fill'
                                                                objectFit='contain'
                                                                alt='Badge Banner'
                                                            />
                                                        </div>
                                                        <Form>
                                                            <div className='d-flex justify-content-center align-items-center'>
                                                                <label htmlFor="fileInput" className="golden-upload">Validate again</label>
                                                                <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
                                                            </div>
                                                            <div className='information text-center pb-md-0 pb-4'>
                                                                Only <strong>PDF</strong> is supported. <br /> (Upto 2 MB)
                                                            </div>
                                                        </Form>
                                                    </>
                                                )}
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
            <div className='page-footer-bg'></div>

            <Modal className='loader-modal' show={isLoading} centered>
                <Modal.Body>
                    <div className='certificate-loader'>
                        <Image
                            src="/backgrounds/certification-loader.gif"
                            layout='fill'
                            objectFit='contain'
                            alt='Loader'
                        />
                    </div>
                    <ProgressBar now={progress} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DocumentsValid;

