import React from 'react';
import Call from '../../../assets/incoming-call.svg';
import NoBroker from '../../../assets/no-war-vladimir-putin.svg';
import Users from '../../../assets/group.svg';
import Fast from '../../../assets/fast-forward.svg';



const benefits = [
  {
    id: 1,
    title: 'Get an edge over competition',
    description:
      'Limit competition from local dealers and maximise your chance of securing owner mandates.',
    icon: Users,
  },
  {
    id: 2,
    title: 'Enjoy uninterrupted access',
    description:
      'Reach out to more relevant owners every month.',
    icon: Call,
  },
  {
    id: 3,
    title: 'No middleman brokerage',
    description:
      'Get direct access to 600+ active owners without any third-party involvement.',
    icon: NoBroker,
  },
  {
    id: 4,
    title: 'Close property deals faster',
    description:
      'Connect with high-intent active owners and close deals quickly.',
    icon: Fast,
  },
];

const BossBenefits = () => {
  return (
    <section className="bg-white flex w-full items-center justify-center h-screen md:gap-8">
      <div className="max-w-7xl ">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          How SMART helps dealers like you
        </h2>
        <div className="flex flex-col gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="flex items-start space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={benefit.icon}
                alt={benefit.title}
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {`0${benefit.id}.`} {benefit.title}
                </h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <img src='https://img.freepik.com/free-vector/business-man-has-idea-with-gold-coin-his-hand_1150-35033.jpg?t=st=1736440796~exp=1736444396~hmac=38b43539121c051fd984aea15110510666874eca7900dc740487d783481b09fe&w=740' alt='benefits' className='h-[60%]' />
    </section>
  );
};

export default BossBenefits;
