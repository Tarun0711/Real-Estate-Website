import React from "react";
import { Navbar } from "../components/common/Navbar";
import Footer from "../components/core/LandingPage/Footer";
function PrivacyAndPolicy() {
  return (
    <div className="w-full h-full ">
      <Navbar isHome={true} />
      <div className="w-11/12 h-full pt-20 mx-auto flex flex-col items-center justify-center">
        <div className="w-full h-[200px] bg-blue-300 rounded-xl flex flex-col items-center justify-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/010/161/639/original/lock-icon-protection-icon-security-padlock-png.png"
            alt=""
            className="h-20 p-2 rounded-full bg-white bg-opacity-40"
          />
          <h1 className="text-2xl font-bold text-center">
            Privacy and Policies
          </h1>
        </div>
        <div className="w-full h-full px-10 py-10 text-gray-700 text-justify">
          Privacy Policy
          <p className="subheadings">
            We, at Info Edge India Limited and our affiliated companies
            worldwide, are committed to respecting your online privacy and
            recognize your need for appropriate protection and management of any
            personally identifiable information you share with us. This Privacy
            Policy (“Policy”) governs our website available at propertywallah.com and
            our mobile application (collectively, the “Platform”). The Policy
            describes how Info Edge India Limited (hereinafter referred to as
            the “Company”) collects, uses, discloses and transfers personal data
            of users while browsing the Platform or availing specific services
            therein (the “Services”). This Policy describes how we process
            personal data of all users of our Platform or Services, including
            buyers, renters, owners, dealers, brokers, and website visitors.
            “Personal Data” means any data about an individual who is
            identifiable by or in relation to such data. By providing your
            consent to this Policy, either on the Platform or through other
            means, or accessing the Platform and Services, you consent to the
            Company’s processing of your Personal Data in accordance with this
            Policy. Where required, for processing your Personal Data for
            distinct purposes, we seek your consent separately on the Platform
            or through other means.
          </p>
          <p className="subheadings">Collection of Personal Data</p>
          <p className="text-sm">
            When you use the Platform, we collect Personal Data in the following
            ways:
          </p>
          <p className="text-sm">
            Information you provide: We collect Personal Data that you provide
            to us, including your name, phone number, email address, postal
            address, and any other information you provide.
          </p>
          <p className="text-sm">
            Information automatically collected: We collect Personal Data that
            your device automatically collects, including your device ID, IP
            address, browser type and version, operating system, device type,
            and geographic location.
          </p>
          <p className="text-sm">
            Information from other sources: We collect Personal Data from
            third-party sources, including social media platforms, data
            providers, and publicly available sources.
          </p>
          <p className="text-sm">
            Information from cookies: We use cookies to collect Personal Data,
            including information about your browsing behavior, device type, and
            geographic location.
          </p>
          <p className="subheadings">Use of Personal Data</p>
          <p className="text-sm">
            We use Personal Data for the following purposes:
          </p>
          <p className="text-sm">
            To provide the Services: We use Personal Data to provide the
            Services, including listing properties, connecting buyers and
            sellers, and facilitating transactions.
          </p>
          <p className="text-sm">
            To improve the Services: We use Personal Data to improve the
            Services, including enhancing the Platform, developing new features,
            and analyzing user behavior.
          </p>
          <p className="text-sm">
            To personalize the Services: We use Personal Data to personalize the
            Services, including showing personalized content, recommendations,
            and advertisements.
          </p>
          <p className="text-sm">
            To communicate with users: We use Personal Data to communicate with
            users, including sending notifications, updates, and marketing
            messages.
          </p>
          <p className="text-sm">
            To comply with legal and regulatory requirements: We use Personal
            Data to comply with legal and regulatory requirements, including
            obtaining necessary permissions, obtaining necessary consents, and
            enforcing data protection laws.
          </p>
        </div>
        <div className="w-full h-[200px] bg-blue-300 rounded-xl flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-center">Cookie Policy</h1>
        </div>
        <div className="w-full h-full px-10 py-10 text-gray-700 text-justify">
          Cookie Policy
          <p className="text-sm">
            We use cookies to collect Personal Data, including information about
            your browsing behavior, device type, and geographic location.
          </p>
          <p className="text-sm">
            Cookies are small text files that are stored on your device. They
            are used to store information about your preferences, browsing
            history, and other settings.
          </p>
          <p className="text-sm">We use cookies for the following purposes:</p>
          <p className="text-sm">
            To provide the Services: We use cookies to provide the Services,
            including listing properties, connecting buyers and sellers, and
            facilitating transactions.
          </p>
          <p className="text-sm">
            To improve the Services: We use cookies to improve the Services,
            including enhancing the Platform, developing new features, and
            analyzing user behavior.
          </p>
          <p className="text-sm">
            To personalize the Services: We use cookies to personalize the
            Services, including showing personalized content, recommendations,
            and advertisements.
          </p>
          <p className="text-sm">
            To communicate with users: We use cookies to communicate with users,
            including sending notifications, updates, and marketing messages.
          </p>
          <p className="text-sm">
            To comply with legal and regulatory requirements: We use cookies to
            comply with legal and regulatory requirements, including obtaining
            necessary permissions, obtaining necessary consents, and enforcing
            data protection laws.
          </p>
        </div>
        <div className="w-full h-[200px] bg-blue-300 rounded-xl flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-center">
            Data Protection Policy
          </h1>
        </div>
        <div className="w-full h-full px-10 py-10 text-gray-700 text-justify">
          Data Protection Policy
          <p className="text-sm">
            We are committed to protecting your Personal Data and ensuring that
            it is processed in accordance with applicable data protection laws.
          </p>
          <p className="text-sm">
            We take reasonable steps to protect your Personal Data, including
            obtaining necessary permissions, obtaining necessary consents, and
            enforcing data protection laws.
          </p>
          <p className="text-sm">
            Our data protection policies are available at:
            propertywallah.com/privacy-policy
          </p>
          <p className="text-sm">
            If you have any questions or concerns about our data protection
            policies, please contact us at:
          </p>
          <p className="text-sm">Email: services@propertywallah.com</p>
          <p className="text-sm">Phone: +1 800 41 9999 (IND Toll-Free)</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyAndPolicy;
