#!/usr/bin/env python3
"""
Generate a time series chart of wellhead tubing pressure as an image.
This tests whether the RAG Knowledge Base can extract data from images.
"""

import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from datetime import datetime, timedelta
import numpy as np

def generate_pressure_chart():
    """Generate a realistic wellhead tubing pressure time series chart"""
    
    # Generate 30 days of hourly data
    start_date = datetime(2026, 1, 1)
    hours = 24 * 30  # 30 days
    dates = [start_date + timedelta(hours=i) for i in range(hours)]
    
    # Generate realistic pressure data with trends and anomalies
    np.random.seed(42)
    
    # Base pressure around 1500 PSI with daily cycles
    base_pressure = 1500
    daily_cycle = 50 * np.sin(np.linspace(0, 30 * 2 * np.pi, hours))
    
    # Add gradual decline (depletion)
    decline = np.linspace(0, -100, hours)
    
    # Add random noise
    noise = np.random.normal(0, 15, hours)
    
    # Create pressure data
    pressure = base_pressure + daily_cycle + decline + noise
    
    # Add some anomalies
    # Pressure spike at day 10 (equipment issue)
    spike_start = 10 * 24
    spike_end = spike_start + 12
    pressure[spike_start:spike_end] += 200
    
    # Pressure drop at day 20 (maintenance)
    drop_start = 20 * 24
    drop_end = drop_start + 24
    pressure[drop_start:drop_end] -= 150
    
    # Create the plot
    fig, ax = plt.subplots(figsize=(12, 6))
    
    # Plot the data
    ax.plot(dates, pressure, linewidth=1.5, color='#2E86AB', label='Tubing Pressure')
    
    # Add critical thresholds
    ax.axhline(y=1600, color='#C73E1D', linestyle='--', linewidth=2, label='High Pressure Alert (1600 PSI)')
    ax.axhline(y=1200, color='#F18F01', linestyle='--', linewidth=2, label='Low Pressure Warning (1200 PSI)')
    
    # Highlight anomalies
    ax.axvspan(dates[spike_start], dates[spike_end], alpha=0.2, color='red', label='Pressure Spike Event')
    ax.axvspan(dates[drop_start], dates[drop_end], alpha=0.2, color='orange', label='Maintenance Period')
    
    # Formatting
    ax.set_xlabel('Date', fontsize=12, fontweight='bold')
    ax.set_ylabel('Pressure (PSI)', fontsize=12, fontweight='bold')
    ax.set_title('Wellhead Tubing Pressure - 30 Day Trend\nWell ID: WH-2547A', 
                 fontsize=14, fontweight='bold', pad=20)
    
    # Format x-axis
    ax.xaxis.set_major_formatter(mdates.DateFormatter('%b %d'))
    ax.xaxis.set_major_locator(mdates.DayLocator(interval=3))
    plt.xticks(rotation=45, ha='right')
    
    # Grid
    ax.grid(True, alpha=0.3, linestyle=':', linewidth=0.5)
    
    # Legend
    ax.legend(loc='upper right', framealpha=0.9, fontsize=10)
    
    # Add statistics box
    stats_text = f"""Statistics (30 days):
Average: {np.mean(pressure):.0f} PSI
Maximum: {np.max(pressure):.0f} PSI
Minimum: {np.min(pressure):.0f} PSI
Std Dev: {np.std(pressure):.0f} PSI
Decline Rate: {(pressure[-1] - pressure[0]) / 30:.1f} PSI/day"""
    
    ax.text(0.02, 0.98, stats_text, transform=ax.transAxes,
            fontsize=9, verticalalignment='top',
            bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.8))
    
    # Tight layout
    plt.tight_layout()
    
    # Save the image
    output_path = 'test_documents/wellhead_pressure_chart.png'
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white')
    print(f"✅ Chart saved: {output_path}")
    
    # Print key data points for testing
    print("\n📊 Key Data Points (for test validation):")
    print(f"   Average Pressure: {np.mean(pressure):.0f} PSI")
    print(f"   Maximum Pressure: {np.max(pressure):.0f} PSI (Day {np.argmax(pressure) // 24 + 1})")
    print(f"   Minimum Pressure: {np.min(pressure):.0f} PSI (Day {np.argmin(pressure) // 24 + 1})")
    print(f"   Pressure Decline: {(pressure[-1] - pressure[0]):.0f} PSI over 30 days")
    print(f"   Decline Rate: {(pressure[-1] - pressure[0]) / 30:.1f} PSI/day")
    print(f"   High Pressure Alert Threshold: 1600 PSI")
    print(f"   Low Pressure Warning Threshold: 1200 PSI")
    print(f"   Pressure Spike Event: Day 10-11 (reached ~{np.max(pressure[spike_start:spike_end]):.0f} PSI)")
    print(f"   Maintenance Period: Day 20-21 (dropped to ~{np.min(pressure[drop_start:drop_end]):.0f} PSI)")
    
    plt.close()
    return output_path

if __name__ == "__main__":
    try:
        generate_pressure_chart()
    except ImportError as e:
        print("❌ Required library not installed")
        print("\nPlease install matplotlib:")
        print("  pip3 install matplotlib")
        print("\nOr use the system package manager:")
        print("  brew install python-matplotlib  # macOS")
        exit(1)
