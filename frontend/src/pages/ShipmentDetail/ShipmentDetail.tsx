import React from "react";
import MilestoneTimeline, {
  MilestoneDetail,
} from "./MilestoneTimeline/MilestoneTimeline";
import DeliveryProofUpload from "./DeliveryProofUpload/DeliveryProofUpload";
import ShipmentDetailHeader from "./ShipmentDetailHeader/ShipmentDetailHeader";
import "./ShipmentDetail.css";

const ShipmentDetail: React.FC = () => {
  // Mock shipment header data
  const shipmentHeaderData = {
    shipmentId: "#SHP-992834",
    status: "in_transit" as const,
    originAddress: "New York Distribution Center, NY 10001",
    destinationAddress: "123 Main Street, Boston, MA 02101",
    expectedDeliveryDate: "Oct 24, 2026 by 5:00 PM EST",
    userRole: "company" as const,
  };

  // Handle status update - can be connected to API later
  const handleUpdateStatus = () => {
    console.log("Update status clicked");
    // TODO: Open modal/dialog for status update
  };

  // Handle track - can navigate to tracking view
  const handleTrack = () => {
    console.log("Track clicked");
    // TODO: Navigate to tracking view or open tracking modal
  };

  // Mock data with 7 milestones including blockchain addresses and expandable details
  const mockMilestones: MilestoneDetail[] = [
    {
      id: "1",
      name: "Order Confirmed",
      timestamp: "2026-02-20 09:15 AM EST",
      location: "New York Distribution Center, NY",
      blockchainAddress: "GABCD1234567890WXYZ1234567890ABCDEF",
      status: "completed",
      notes:
        "Order successfully confirmed and payment verified on blockchain. Shipment prepared for pickup.",
      sensorReadings: {
        temperature: "22°C",
        humidity: "45%",
        pressure: "1013 hPa",
      },
    },
    {
      id: "2",
      name: "Picked Up by Carrier",
      timestamp: "2026-02-20 02:30 PM EST",
      location: "New York Distribution Center, NY",
      blockchainAddress: "GEFGH2345678901YZAB2345678901BCDEFG",
      status: "completed",
      notes:
        "Package picked up by carrier. Driver ID verified and logged on-chain.",
      sensorReadings: {
        temperature: "21°C",
        humidity: "48%",
        pressure: "1012 hPa",
      },
    },
    {
      id: "3",
      name: "In Transit - Philadelphia Hub",
      timestamp: "2026-02-21 08:45 AM EST",
      location: "Philadelphia Logistics Hub, PA",
      blockchainAddress: "GIJKL3456789012ZABC3456789012CDEFGH",
      status: "completed",
      notes:
        "Shipment arrived at Philadelphia hub. Passed quality inspection. Temperature maintained within acceptable range.",
      sensorReadings: {
        temperature: "20°C",
        humidity: "50%",
        pressure: "1014 hPa",
      },
    },
    {
      id: "4",
      name: "Departed Philadelphia Hub",
      timestamp: "2026-02-21 03:20 PM EST",
      location: "Philadelphia Logistics Hub, PA",
      blockchainAddress: "GMNOP4567890123ABCD4567890123DEFGHI",
      status: "completed",
      notes:
        "Package departed Philadelphia hub en route to Boston. Expected arrival tomorrow morning.",
      sensorReadings: {
        temperature: "19°C",
        humidity: "52%",
        pressure: "1015 hPa",
      },
    },
    {
      id: "5",
      name: "Arrived at Boston Facility",
      timestamp: "2026-02-22 07:10 AM EST",
      location: "Boston Regional Facility, MA",
      blockchainAddress: "GQRST5678901234BCDE5678901234EFGHIJ",
      status: "completed",
      notes:
        "Shipment arrived at Boston facility. Sorted and prepared for final delivery.",
      sensorReadings: {
        temperature: "18°C",
        humidity: "55%",
        pressure: "1016 hPa",
      },
    },
    {
      id: "6",
      name: "Out for Delivery",
      timestamp: "2026-02-23 09:00 AM EST",
      location: "Boston, MA",
      blockchainAddress: "GUVWX6789012345CDEF6789012345FGHIJK",
      status: "current",
      notes:
        "Package is currently out for delivery. Driver en route to destination address.",
      sensorReadings: {
        temperature: "17°C",
        humidity: "58%",
        pressure: "1017 hPa",
      },
    },
    {
      id: "7",
      name: "Delivered",
      timestamp: "Expected: 2026-02-23 05:00 PM EST",
      location: "Boston, MA",
      blockchainAddress: "GYZAB7890123456DEFG7890123456GHIJKL",
      status: "upcoming",
      notes:
        "Estimated delivery time. Signature will be required upon delivery.",
    },
  ];

  return (
    <div className="shipment-detail-page">
      <div className="shipment-detail-container">
        <div className="shipment-detail-header">
          <h1 className="shipment-detail-title">
            SHIPMENT{" "}
            <span className="shipment-detail-title-accent">DETAILS</span>
          </h1>
          <p className="shipment-detail-subtitle">
            Track your shipment's journey with blockchain-verified milestones
          </p>
        </div>

        <div className="shipment-detail-content">
          {/* Shipment Header Section */}
          <ShipmentDetailHeader
            {...shipmentHeaderData}
            onUpdateStatus={handleUpdateStatus}
            onTrack={handleTrack}
          />

          {/* Divider */}
          <div className="divider-line"></div>

          {/* Milestone Timeline Section */}
          <h2 className="milestone-section-title">
            MILESTONE{" "}
            <span className="milestone-section-title-accent">TIMELINE</span>
          </h2>
          <MilestoneTimeline milestones={mockMilestones} />
        </div>

        <DeliveryProofUpload />
      </div>
    </div>
  );
};

export default ShipmentDetail;
