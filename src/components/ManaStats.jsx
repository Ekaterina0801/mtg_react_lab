import {useEffect, useRef} from "react";
import * as d3 from "d3";

const ManaCostStats = ({ data = [] }) => {  
    const chartRef = useRef();

    useEffect(() => {
        if (data && data.length > 0) {
            buildStats(chartRef.current, data);
        }
    }, [data]);  

    const buildStats = (element, data) => {
        if (!data || data.length === 0) return;

        const margin = { top: 30, right: 30, bottom: 70, left: 60 };
        const width = 460 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        d3.select(element).selectAll("*").remove();

        const svg = d3
            .select(element)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3
            .scaleBand()
            .range([0, width])
            .domain(data.map((d) => d.cost))
            .padding(0.2);

        svg
            .append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.count)])
            .range([height, 0]);

        svg.append("g").call(d3.axisLeft(y));

        svg
            .selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d) => x(d.cost))
            .attr("y", (d) => y(d.count))
            .attr("width", x.bandwidth())
            .attr("height", (d) => height - y(d.count))
            .attr("fill", "#69b3a2");

        svg
            .append("text")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", -margin.top / 2)
            .text("Распределение стоимости маны в колоде MTG");

        svg
            .append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -height / 2)
            .text("Number of Cards");

        svg
            .append("text")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .text("Mana Cost");
    };

    if (!data || data.length === 0) {
        return <div>Тут могла бы быть ваша <s>реклама</s> статистика по картам, но вы ничего не добавили</div>; 
    }

    return <div ref={chartRef}></div>;
};

export default ManaCostStats;
