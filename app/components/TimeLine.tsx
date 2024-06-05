// components/Timeline.tsx

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const Timeline: React.FC = () => {
  const [startDate1, setStartDate1] = useState<string>('');
  const [endDate1, setEndDate1] = useState<string>('');
  const [startDate2, setStartDate2] = useState<string>('');
  const [endDate2, setEndDate2] = useState<string>('');
  const [timeline1Fixed, setTimeline1Fixed] = useState<boolean>(false);
  const [timeline2Fixed, setTimeline2Fixed] = useState<boolean>(false);
  const svgRef1 = useRef<SVGSVGElement | null>(null);
  const svgRef2 = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (startDate1 && endDate1 && timeline1Fixed) {
      drawTimeline(new Date(startDate1), new Date(endDate1), svgRef1);
    }
    if (startDate2 && endDate2 && timeline2Fixed) {
      drawTimeline(new Date(startDate2), new Date(endDate2), svgRef2);
    }
  }, [startDate1, endDate1, timeline1Fixed, startDate2, endDate2, timeline2Fixed]);

  const drawTimeline = (startDate: Date, endDate: Date, svgRef: React.RefObject<SVGSVGElement | null>): void => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous timeline

    const width = 800;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };

    const x = d3.scaleTime()
      .domain([startDate, endDate])
      .range([margin.left, width - margin.right]);

    const xAxis = d3.axisBottom(x);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    svg.append('line')
      .attr('x1', x(startDate))
      .attr('x2', x(endDate))
      .attr('y1', height / 2)
      .attr('y2', height / 2)
      .attr('stroke', 'black')
      .attr('stroke-width', 2);

    svg.append('circle')
      .attr('cx', x(startDate))
      .attr('cy', height / 2)
      .attr('r', 8)
      .attr('fill', 'blue');

    svg.append('circle')
      .attr('cx', x(endDate))
      .attr('cy', height / 2)
      .attr('r', 8)
      .attr('fill', 'blue');

    svg.append('text')
      .attr('x', x(startDate))
      .attr('y', height / 2 - 15)
      .attr('text-anchor', 'middle')
      .attr('class', 'text-xs font-semibold')
      .text(startDate.toDateString());

    svg.append('text')
      .attr('x', x(endDate))
      .attr('y', height / 2 - 15)
      .attr('text-anchor', 'middle')
      .attr('class', 'text-xs font-semibold')
      .text(endDate.toDateString());
  };

  const handleAddButtonClick = (timelineNumber: number) => {
    if (timelineNumber === 1) {
      if (!startDate1 || !endDate1) {
        alert('Please select both start and end dates for Timeline 1.');
        return;
      }
      setTimeline1Fixed(true);
    } else if (timelineNumber === 2) {
      if (!startDate2 || !endDate2) {
        alert('Please select both start and end dates for Timeline 2.');
        return;
      }
      setTimeline2Fixed(true);
    }
  };

  return (
    <div className="m-5">
      <h2 className="text-2xl font-bold mb-4">Historical Timelines</h2>
      <div className="mb-5">
        <div className="p-4 border border-gray-300 rounded-lg shadow-md bg-white mb-4">
          <form onSubmit={(e) => e.preventDefault()} className="mb-4">
            <div className="flex items-center mb-4">
              <label htmlFor="startDate1" className="block text-gray-700 font-bold mr-2">Start Date:</label>
              <input 
                type="date" 
                id="startDate1" 
                value={startDate1} 
                onChange={(e) => setStartDate1(e.target.value)} 
                required 
                className="mb-4 p-2 border border-gray-300 rounded w-full text-green-500" 
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="endDate1" className="block text-gray-700 font-bold mr-2">End Date:</label>
              <input 
                type="date" 
                id="endDate1" 
                value={endDate1} 
                onChange={(e) => setEndDate1(e.target.value)} 
                required 
                className="mb-4 p-2 border border-gray-300 rounded w-full text-green-500" 
              />
            </div>
          </form>
          <button 
            onClick={() => handleAddButtonClick(1)} 
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${timeline1Fixed ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={timeline1Fixed}
          >
            {timeline1Fixed ? 'Timeline 1 Fixed' : 'Add Timeline 1'}
          </button>
        </div>
        {timeline1Fixed && (
          <svg ref={svgRef1} width="800" height="200" className="border border-gray-300 bg-white rounded shadow-md mb-4"></svg>
        )}
      </div>
      <div className="mb-5">
        <div className="p-4 border border-gray-300 rounded-lg shadow-md bg-white mb-4">
          <form onSubmit={(e) => e.preventDefault()} className="mb-4">
            <div className="flex items-center mb-4">
              <label htmlFor="startDate2" className="block text-gray-700 font-bold mr-2">Start Date:</label>
              <input 
                type="date" 
                id="startDate2" 
                value={startDate2} 
                onChange={(e) => setStartDate2(e.target.value)} 
                required 
                className="mb-4 p-2 border border-gray-300 rounded w-full text-green-500" 
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="endDate2" className="block text-gray-700 font-bold mr-2">End Date:</label>
              <input 
                type="date" 
                id="endDate2" 
                value={endDate2} 
                onChange={(e) => setEndDate2(e.target.value)} 
                required 
                className="mb-4 p-2 border border-gray-300 rounded w-full text-green-500" 
              />
            </div>
          </form>
          <button 
            onClick={() => handleAddButtonClick(2)} 
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${timeline2Fixed ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={timeline2Fixed}
          >
            {timeline2Fixed ? 'Timeline 2 Fixed' : 'Add Timeline 2'}
          </button>
        </div>
        {timeline2Fixed && (
          <svg ref={svgRef2} width="800" height="200" className="border border-gray-300 bg-white rounded shadow-md mb-4"></svg>
        )}
      </div>
    </div>
  );
};

export default Timeline;
