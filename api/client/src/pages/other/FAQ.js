import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';

// FAQ component
const FAQ = () => {
    // chunk the list to display in two columns
    const rawFaqs1 = [
        {
            id: 1,
            question: 'How do I access the Hubcap Trading Platform?',
            answer:
                'If you are seeing this question you probably already have access to the platform, Select an option such a charting to get started',
        },
        {
            id: 2,
            question: 'Can I add my own indicators?',
            answer:
                "Not yet. If you have an indicator you'd like to see on the site, tell us about it during a live stream, or if you have a premium membership submit it as a support ticket.",
        },
    ];

    const rawFaqs2 = [
        {
            id: 3,
            question: 'How do I get help with trading?',
            answer:
                'contact us for support, and also check out our Youtube/ Twitch content for up to date tutorials and video on how to use the site.',
        },
        {
            id: 4,
            question: 'Will you regularly give updates?',
            answer:
                'Yes, We update all securities as fast as we can. I recomend trading on the daily chart using our software, so you wont miss the minute data.',
        },
    ];

    return (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Pages', path: '/pages/faq' },
                    { label: 'FAQ', active: true },
                ]}
                title={'FAQ'}
            />

            <Row>
                <Col>
                    <div className="text-center">
                        <h3 className="">Frequently Asked Questions</h3>
                        <p className="text-muted mt-3">
                            {' '}
                            Review the information below if you have any questions about our website. I will try to
                            respond as fast
                            <br /> as possible via email or twitter, but I will not repond if answer is already in the
                            FAQs
                        </p>
                        <a href="mailto:jason@hubcap.com" target="_blank">
                            <button type="button" className="btn btn-success btn-sm mt-2">
                                <i className="mdi mdi-email-outline mr-1"></i> Email us your question
                            </button>
                        </a>
                        <a href="https://twitter.com/HubcapFounder" target="_blank">
                            <button type="button" className="btn btn-info btn-sm mt-2 ml-1">
                                <i className="mdi mdi-twitter mr-1"></i> Send us a tweet
                            </button>
                        </a>
                    </div>
                </Col>
            </Row>

            <Row className="pt-5">
                <Col lg={5} className="offset-lg-1">
                    {rawFaqs1.map((ques, idx) => {
                        return (
                            <div key={idx}>
                                <div className="faq-question-q-box">Q.</div>
                                <h4 className="faq-question" data-wow-delay=".1s">
                                    {ques.question}
                                </h4>
                                <p className="faq-answer mb-4">{ques.answer}</p>
                            </div>
                        );
                    })}
                </Col>
                <Col lg={5}>
                    {rawFaqs2.map((ques, idx) => {
                        return (
                            <div key={idx}>
                                <div className="faq-question-q-box">Q.</div>
                                <h4 className="faq-question" data-wow-delay=".1s">
                                    {ques.question}
                                </h4>
                                <p className="faq-answer mb-4">{ques.answer}</p>
                            </div>
                        );
                    })}
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default FAQ;
