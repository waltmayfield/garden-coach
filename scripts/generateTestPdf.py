#!/usr/bin/env python3
"""
Generate a test PDF with images and text for RAG multimodal testing.
This PDF contains technical diagrams, charts, and descriptive text.
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.graphics.shapes import Drawing, Rect, Circle, Line, String
from reportlab.graphics.charts.barcharts import VerticalBarChart
from reportlab.graphics.charts.piecharts import Pie
from reportlab.graphics import renderPDF
import io

def create_bar_chart():
    """Create a bar chart showing equipment performance metrics"""
    drawing = Drawing(400, 200)
    
    chart = VerticalBarChart()
    chart.x = 50
    chart.y = 50
    chart.height = 125
    chart.width = 300
    chart.data = [
        [85, 92, 78, 88, 95],  # Efficiency %
        [12, 8, 15, 10, 6]     # Downtime hours
    ]
    chart.categoryAxis.categoryNames = ['Pump A', 'Pump B', 'Pump C', 'Pump D', 'Pump E']
    chart.valueAxis.valueMin = 0
    chart.valueAxis.valueMax = 100
    chart.bars[0].fillColor = colors.HexColor('#2E86AB')
    chart.bars[1].fillColor = colors.HexColor('#A23B72')
    
    # Add title
    title = String(200, 180, 'Equipment Performance Metrics', textAnchor='middle')
    title.fontSize = 14
    title.fontName = 'Helvetica-Bold'
    drawing.add(title)
    
    # Add legend
    legend_y = 160
    drawing.add(Rect(50, legend_y, 15, 10, fillColor=colors.HexColor('#2E86AB')))
    drawing.add(String(70, legend_y + 2, 'Efficiency %', fontSize=10))
    drawing.add(Rect(150, legend_y, 15, 10, fillColor=colors.HexColor('#A23B72')))
    drawing.add(String(170, legend_y + 2, 'Downtime (hrs)', fontSize=10))
    
    drawing.add(chart)
    return drawing

def create_pie_chart():
    """Create a pie chart showing maintenance cost breakdown"""
    drawing = Drawing(400, 200)
    
    pie = Pie()
    pie.x = 150
    pie.y = 50
    pie.width = 100
    pie.height = 100
    pie.data = [35, 25, 20, 15, 5]
    pie.labels = ['Labor', 'Parts', 'Equipment', 'Contractors', 'Other']
    pie.slices.strokeWidth = 0.5
    pie.slices[0].fillColor = colors.HexColor('#2E86AB')
    pie.slices[1].fillColor = colors.HexColor('#A23B72')
    pie.slices[2].fillColor = colors.HexColor('#F18F01')
    pie.slices[3].fillColor = colors.HexColor('#C73E1D')
    pie.slices[4].fillColor = colors.HexColor('#6A994E')
    
    # Add title
    title = String(200, 180, 'Maintenance Cost Breakdown', textAnchor='middle')
    title.fontSize = 14
    title.fontName = 'Helvetica-Bold'
    drawing.add(title)
    
    drawing.add(pie)
    return drawing

def create_system_diagram():
    """Create a simple system architecture diagram"""
    drawing = Drawing(400, 250)
    
    # Title
    title = String(200, 230, 'Oil & Gas Production System Architecture', textAnchor='middle')
    title.fontSize = 14
    title.fontName = 'Helvetica-Bold'
    drawing.add(title)
    
    # Wellhead
    drawing.add(Rect(50, 150, 80, 50, fillColor=colors.HexColor('#2E86AB'), strokeColor=colors.black))
    drawing.add(String(90, 170, 'Wellhead', textAnchor='middle', fillColor=colors.white, fontSize=10))
    
    # Separator
    drawing.add(Rect(170, 150, 80, 50, fillColor=colors.HexColor('#A23B72'), strokeColor=colors.black))
    drawing.add(String(210, 170, 'Separator', textAnchor='middle', fillColor=colors.white, fontSize=10))
    
    # Storage
    drawing.add(Rect(290, 150, 80, 50, fillColor=colors.HexColor('#F18F01'), strokeColor=colors.black))
    drawing.add(String(330, 170, 'Storage', textAnchor='middle', fillColor=colors.white, fontSize=10))
    
    # Arrows
    drawing.add(Line(130, 175, 170, 175, strokeWidth=2))
    drawing.add(Line(250, 175, 290, 175, strokeWidth=2))
    
    # Sensors
    drawing.add(Circle(90, 120, 15, fillColor=colors.HexColor('#6A994E'), strokeColor=colors.black))
    drawing.add(String(90, 117, 'P', textAnchor='middle', fillColor=colors.white, fontSize=12, fontName='Helvetica-Bold'))
    drawing.add(String(90, 95, 'Pressure', textAnchor='middle', fontSize=8))
    
    drawing.add(Circle(210, 120, 15, fillColor=colors.HexColor('#6A994E'), strokeColor=colors.black))
    drawing.add(String(210, 117, 'T', textAnchor='middle', fillColor=colors.white, fontSize=12, fontName='Helvetica-Bold'))
    drawing.add(String(210, 95, 'Temperature', textAnchor='middle', fontSize=8))
    
    drawing.add(Circle(330, 120, 15, fillColor=colors.HexColor('#6A994E'), strokeColor=colors.black))
    drawing.add(String(330, 117, 'L', textAnchor='middle', fillColor=colors.white, fontSize=12, fontName='Helvetica-Bold'))
    drawing.add(String(330, 95, 'Level', textAnchor='middle', fontSize=8))
    
    # Connecting lines to sensors
    drawing.add(Line(90, 150, 90, 135, strokeWidth=1, strokeDashArray=[2, 2]))
    drawing.add(Line(210, 150, 210, 135, strokeWidth=1, strokeDashArray=[2, 2]))
    drawing.add(Line(330, 150, 330, 135, strokeWidth=1, strokeDashArray=[2, 2]))
    
    return drawing

def generate_pdf():
    """Generate the complete test PDF"""
    filename = "test_documents/industrial_operations_manual.pdf"
    
    # Create document
    doc = SimpleDocTemplate(filename, pagesize=letter,
                          rightMargin=72, leftMargin=72,
                          topMargin=72, bottomMargin=18)
    
    # Container for the 'Flowable' objects
    elements = []
    
    # Define styles
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name='Justify', alignment=TA_JUSTIFY))
    styles.add(ParagraphStyle(name='Center', alignment=TA_CENTER, fontSize=16, fontName='Helvetica-Bold'))
    
    # Title Page
    title = Paragraph("Industrial Operations Manual", styles['Center'])
    elements.append(title)
    elements.append(Spacer(1, 0.2*inch))
    
    subtitle = Paragraph("Equipment Performance & Maintenance Guide", styles['Center'])
    elements.append(subtitle)
    elements.append(Spacer(1, 0.5*inch))
    
    # Introduction
    intro_title = Paragraph("<b>1. Introduction</b>", styles['Heading1'])
    elements.append(intro_title)
    elements.append(Spacer(1, 0.1*inch))
    
    intro_text = """
    This manual provides comprehensive guidance on industrial equipment operations, 
    maintenance procedures, and performance monitoring. The document includes detailed 
    performance metrics, cost analysis, and system architecture diagrams to support 
    operational decision-making.
    """
    elements.append(Paragraph(intro_text, styles['Justify']))
    elements.append(Spacer(1, 0.3*inch))
    
    # Equipment Performance Section
    perf_title = Paragraph("<b>2. Equipment Performance Analysis</b>", styles['Heading1'])
    elements.append(perf_title)
    elements.append(Spacer(1, 0.1*inch))
    
    perf_text = """
    The following chart illustrates the performance metrics for five critical pumps 
    in the production facility. Pump E demonstrates the highest efficiency at 95% 
    with only 6 hours of downtime, while Pump C shows the lowest efficiency at 78% 
    with 15 hours of downtime. These metrics are crucial for predictive maintenance 
    scheduling and resource allocation.
    """
    elements.append(Paragraph(perf_text, styles['Justify']))
    elements.append(Spacer(1, 0.2*inch))
    
    # Add bar chart
    elements.append(create_bar_chart())
    elements.append(Spacer(1, 0.3*inch))
    
    # Key Findings
    findings_text = """
    <b>Key Findings:</b><br/>
    • Pump E requires minimal intervention with 95% efficiency<br/>
    • Pump C needs immediate attention due to high downtime<br/>
    • Average fleet efficiency is 87.6%<br/>
    • Total downtime across all pumps: 51 hours per month
    """
    elements.append(Paragraph(findings_text, styles['BodyText']))
    elements.append(PageBreak())
    
    # Maintenance Cost Section
    cost_title = Paragraph("<b>3. Maintenance Cost Analysis</b>", styles['Heading1'])
    elements.append(cost_title)
    elements.append(Spacer(1, 0.1*inch))
    
    cost_text = """
    Annual maintenance costs total $2.5 million across the facility. The pie chart 
    below shows the breakdown of these costs. Labor represents the largest expense 
    at 35% ($875,000), followed by parts at 25% ($625,000). Understanding this 
    distribution helps optimize maintenance budgets and identify cost reduction 
    opportunities.
    """
    elements.append(Paragraph(cost_text, styles['Justify']))
    elements.append(Spacer(1, 0.2*inch))
    
    # Add pie chart
    elements.append(create_pie_chart())
    elements.append(Spacer(1, 0.3*inch))
    
    # Cost breakdown table
    cost_data = [
        ['Category', 'Amount', 'Percentage'],
        ['Labor', '$875,000', '35%'],
        ['Parts', '$625,000', '25%'],
        ['Equipment', '$500,000', '20%'],
        ['Contractors', '$375,000', '15%'],
        ['Other', '$125,000', '5%'],
        ['Total', '$2,500,000', '100%']
    ]
    
    cost_table = Table(cost_data, colWidths=[2*inch, 1.5*inch, 1.5*inch])
    cost_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#2E86AB')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -2), colors.beige),
        ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor('#F18F01')),
        ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
        ('GRID', (0, 0), (-1, -1), 1, colors.black)
    ]))
    
    elements.append(cost_table)
    elements.append(PageBreak())
    
    # System Architecture Section
    arch_title = Paragraph("<b>4. System Architecture</b>", styles['Heading1'])
    elements.append(arch_title)
    elements.append(Spacer(1, 0.1*inch))
    
    arch_text = """
    The production system consists of three main components: Wellhead, Separator, 
    and Storage. Each component is monitored by dedicated sensors measuring pressure, 
    temperature, and level respectively. The diagram below illustrates the flow of 
    materials through the system and the sensor placement for real-time monitoring.
    """
    elements.append(Paragraph(arch_text, styles['Justify']))
    elements.append(Spacer(1, 0.2*inch))
    
    # Add system diagram
    elements.append(create_system_diagram())
    elements.append(Spacer(1, 0.3*inch))
    
    # Technical specifications
    spec_text = """
    <b>Technical Specifications:</b><br/>
    • Wellhead Operating Pressure: 1,500 PSI<br/>
    • Separator Temperature Range: 150-200°F<br/>
    • Storage Capacity: 10,000 barrels<br/>
    • Sensor Accuracy: ±0.5%<br/>
    • Data Sampling Rate: 1 Hz
    """
    elements.append(Paragraph(spec_text, styles['BodyText']))
    elements.append(Spacer(1, 0.3*inch))
    
    # Safety considerations
    safety_title = Paragraph("<b>5. Safety Considerations</b>", styles['Heading1'])
    elements.append(safety_title)
    elements.append(Spacer(1, 0.1*inch))
    
    safety_text = """
    All maintenance activities must follow strict safety protocols. The pressure 
    sensor at the wellhead is critical for preventing overpressure conditions. 
    Temperature monitoring at the separator prevents thermal runaway. Level sensors 
    at storage prevent overflow incidents. Emergency shutdown procedures must be 
    tested quarterly.
    """
    elements.append(Paragraph(safety_text, styles['Justify']))
    
    # Build PDF
    doc.build(elements)
    print(f"PDF generated successfully: {filename}")
    return filename

if __name__ == "__main__":
    import os
    os.makedirs("test_documents", exist_ok=True)
    generate_pdf()
