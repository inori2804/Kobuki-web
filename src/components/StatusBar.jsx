import { Box } from "@mui/material";
import RouteIcon from '@mui/icons-material/Route';
import SpeedIcon from '@mui/icons-material/Speed';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import ComputerIcon from '@mui/icons-material/Computer';
import StatBox from "./StatBox";
import { rosServer } from "../global";
import { useEffect, useState } from "react";
import ROSLIB from "roslib";

const StatusBar = ({ title, subtitle }) => {

    const [velocity, setVelocity] = useState("0.00");
    const [cpuUtilization, setCpuUtilization] = useState("0.00");
    const [batteryLevel, setBatteryLevel] = useState("0.00");
    const [distance, setDistance] = useState("0.00");

    let subVelocity = null;
    let subCpuUtilization = null;
    let subBatteryLevel = null;
    let subDistance = null;

    const regVelocityTopic = () => {
        if (rosServer !== null) {
            subVelocity = new ROSLIB.Topic({
                ros: rosServer,
                name: "/mobile_base/commands/velocity",
                messageType: "geometry_msgs/Twist",
            });
        }
    };

    const regBatteryLevelTopic = () => {
        if (rosServer !== null) {
            subBatteryLevel = new ROSLIB.Topic({
                ros: rosServer,
                name: "/kobuki_battery_level",
                messageType: "std_msgs/Float32",
            });
        }
    };

    const regCpuUtilizationTopic = () => {
        if (rosServer !== null) {
            subCpuUtilization = new ROSLIB.Topic({
                ros: rosServer,
                name: "/cpu_utilization",
                messageType: "std_msgs/Float64",
            });
        }
    };

    const regDistanceTopic = () => {
        if (rosServer !== null) {
            subDistance = new ROSLIB.Topic({
                ros: rosServer,
                name: "/distance",
                messageType: "std_msgs/Float64",
            });
        }
    };

    useEffect(() => {
        try {
            regVelocityTopic();
            subVelocity.subscribe(function (message) {
                setVelocity(Math.abs(Math.round(message.linear.x * 100) / 100).toFixed(2));
            });

            regCpuUtilizationTopic();
            subCpuUtilization.subscribe(function (message) {
                setCpuUtilization(message.data.toFixed(2));
            });

            regBatteryLevelTopic();
            subBatteryLevel.subscribe(function (message) {
                setBatteryLevel(message.data.toFixed(2));
            });

            regDistanceTopic();
            subDistance.subscribe(function (message) {
                setDistance(message.data.toFixed(2));
            });

            return () => {
                subVelocity.unsubscribe();
                subCpuUtilization.unsubscribe();
                subBatteryLevel.unsubscribe();
                subDistance.unsubscribe();
            };
        } catch (e) {
            console.error(`Some error ${e.message}`);
        }
    }, []);

    return (
        <>
            {/* GRID & CHARTS */}
            <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gridAutoRows='140px' gap='20px'>
                {/* ROW 1 */}
                <Box
                    gridColumn='span 3'
                    backgroundColor="#1F2A40"
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    borderRadius={5}
                >
                    <StatBox
                        title={batteryLevel}
                        subtitle='Kobuki Battery (%)'
                        progress={batteryLevel / 100}
                        icon={<BatteryChargingFullIcon sx={{ color: "#3da58a", fontSize: "26px" }} />}
                    />
                </Box>
                <Box
                    gridColumn='span 3'
                    backgroundColor="#1F2A40"
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    borderRadius={5}
                >
                    <StatBox
                        title={distance}
                        subtitle='Estimated Distance (m)'
                        progress={distance}
                        icon={<RouteIcon sx={{ color: "#3da58a", fontSize: "26px" }} />}
                    />
                </Box>
                <Box
                    gridColumn='span 3'
                    backgroundColor="#1F2A40"
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    borderRadius={5}
                >
                    <StatBox
                        title={velocity}
                        subtitle='Speed (m/s)'
                        progress={velocity / 0.3}
                        icon={<SpeedIcon sx={{ color: "#3da58a", fontSize: "26px" }} />}
                    />
                </Box>
                <Box
                    gridColumn='span 3'
                    backgroundColor="#1F2A40"
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    borderRadius={5}
                >
                    <StatBox
                        title={cpuUtilization}
                        subtitle='CPU Utilization (%)'
                        progress={cpuUtilization / 100}
                        icon={<ComputerIcon sx={{ color: "#3da58a", fontSize: "26px" }} />}
                    />
                </Box>
            </Box>
        </>
    );
};

export default StatusBar;
