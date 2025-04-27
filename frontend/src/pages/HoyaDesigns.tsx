import React from 'react';
import '../styles/ProjectPage.css';

/**
 * Agricultural Energy Optimization Platform Page
 * 
 * This page is designed to embed the Python Dash dashboard via an iframe.
 * 
 * To properly deploy the dashboard:
 * 1. Deploy the Dash application from HoyaDesigns/src/dashboard/app.py to a hosting service
 *    (e.g., Heroku, AWS, Google Cloud Run, or similar services that support Python)
 * 2. Make sure CORS is properly configured on the dashboard server to allow embedding
 * 3. Replace the iframe src URL with your hosted dashboard URL
 * 4. The dashboard should be accessible via HTTPS for security reasons
 * 
 * Deployment commands for the dashboard:
 * cd /Users/alecczepiel/Desktop/czepbuilds/HoyaDesigns
 * docker build -t energy-dashboard -f deployment/dashboard/Dockerfile .
 * docker run -p 8050:8050 energy-dashboard
 */
const HoyaDesigns: React.FC = () => {
  // We'll display static representations of the dashboard
  return (
    <div className="project-page">
      <div style={{ 
        width: '100%', 
        padding: '1rem 2rem 3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div className="dashboard-container" style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          background: 'var(--bg-color-secondary)',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          {/* Dashboard Header */}
          <div style={{ 
            padding: '1.5rem 2rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--color-primary)',
            color: 'var(--color-off-white)'
          }}>
            <h2 style={{ margin: 0 }}>Agricultural Energy Optimization Platform</h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                Export Data
              </button>
              <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                Refresh
              </button>
            </div>
          </div>

          {/* Dashboard Control Panel */}
          <div style={{ 
            padding: '1rem 2rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Facility</label>
                <select style={{ 
                  padding: '0.5rem', 
                  borderRadius: '4px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-color)'
                }}>
                  <option>Greenhouse Alpha</option>
                  <option>Vertical Farm Beta</option>
                  <option>Research Facility Gamma</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Date Range</label>
                <select style={{ 
                  padding: '0.5rem', 
                  borderRadius: '4px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-color)'
                }}>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                  <option>Custom Range</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Metrics</label>
                <select style={{ 
                  padding: '0.5rem', 
                  borderRadius: '4px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-color)'
                }}>
                  <option>Energy Consumption</option>
                  <option>Cost Analysis</option>
                  <option>Environmental Impact</option>
                </select>
              </div>
            </div>
          </div>

          {/* Dashboard KPI Cards */}
          <div style={{ 
            padding: '1.5rem 2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{ 
              padding: '1rem',
              background: 'rgba(18, 53, 36, 0.2)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3 style={{ marginTop: 0, fontSize: '1rem' }}>Total Consumption</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>1,245 kWh</p>
              <span style={{ fontSize: '0.8rem', color: '#4CAF50' }}>↓ 5.2% vs previous period</span>
            </div>
            <div style={{ 
              padding: '1rem',
              background: 'rgba(18, 53, 36, 0.2)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3 style={{ marginTop: 0, fontSize: '1rem' }}>Average Daily</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>42.3 kWh</p>
              <span style={{ fontSize: '0.8rem', color: '#4CAF50' }}>↓ 3.1% vs previous period</span>
            </div>
            <div style={{ 
              padding: '1rem',
              background: 'rgba(18, 53, 36, 0.2)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3 style={{ marginTop: 0, fontSize: '1rem' }}>Peak Demand</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>78.9 kW</p>
              <span style={{ fontSize: '0.8rem', color: '#F44336' }}>↑ 2.4% vs previous period</span>
            </div>
            <div style={{ 
              padding: '1rem',
              background: 'rgba(18, 53, 36, 0.2)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3 style={{ marginTop: 0, fontSize: '1rem' }}>Total Cost</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>$183.21</p>
              <span style={{ fontSize: '0.8rem', color: '#4CAF50' }}>↓ 7.8% vs previous period</span>
            </div>
          </div>

          {/* Main Chart Area */}
          <div style={{ padding: '0 2rem 1.5rem' }}>
            <div style={{ 
              width: '100%', 
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              overflow: 'hidden',
              marginBottom: '1.5rem',
              height: '320px',
              position: 'relative',
              background: 'var(--bg-color)'
            }}>
              <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Energy Consumption Over Time</h3>
              </div>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'calc(100% - 54px)',
                background: 'var(--bg-color)',
                position: 'relative'
              }}>
                <div className="placeholder-chart" style={{
                  width: '100%',
                  height: '100%', 
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'repeating-linear-gradient(45deg, var(--bg-color-secondary), var(--bg-color-secondary) 10px, var(--bg-color) 10px, var(--bg-color) 20px)'
                }}>
                  <svg viewBox="0 0 100 50" width="80" height="40">
                    <polyline
                      points="0,25 10,20 20,30 30,15 40,25 50,10 60,20 70,5 80,15 90,10 100,20"
                      fill="none"
                      stroke="var(--color-primary)"
                      strokeWidth="2"
                    />
                  </svg>
                  <p style={{ textAlign: 'center', padding: '0 2rem' }}>
                    Interactive Energy Consumption Chart
                    <br />
                    <small>Time-series data with consumption trends</small>
                  </p>
                </div>
              </div>
            </div>

            {/* Secondary Charts Grid */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ 
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                overflow: 'hidden',
                height: '250px',
                background: 'var(--bg-color)'
              }}>
                <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Weather Correlation</h3>
                </div>
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 'calc(100% - 54px)',
                  background: 'var(--bg-color)'
                }}>
                  <div className="placeholder-chart" style={{
                    width: '100%',
                    height: '100%', 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'repeating-linear-gradient(45deg, var(--bg-color-secondary), var(--bg-color-secondary) 10px, var(--bg-color) 10px, var(--bg-color) 20px)'
                  }}>
                    <svg viewBox="0 0 100 100" width="40" height="40">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-primary)" strokeWidth="2" />
                      <line x1="30" y1="50" x2="70" y2="50" stroke="var(--color-primary)" strokeWidth="2" />
                      <line x1="50" y1="30" x2="50" y2="70" stroke="var(--color-primary)" strokeWidth="2" />
                    </svg>
                    <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>
                      Temperature vs. Energy Usage
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ 
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                overflow: 'hidden',
                height: '250px',
                background: 'var(--bg-color)'
              }}>
                <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Hourly Consumption Pattern</h3>
                </div>
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 'calc(100% - 54px)',
                  background: 'var(--bg-color)'
                }}>
                  <div className="placeholder-chart" style={{
                    width: '100%',
                    height: '100%', 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'repeating-linear-gradient(45deg, var(--bg-color-secondary), var(--bg-color-secondary) 10px, var(--bg-color) 10px, var(--bg-color) 20px)'
                  }}>
                    <svg viewBox="0 0 100 60" width="40" height="30">
                      <rect x="5" y="30" width="5" height="25" fill="var(--color-primary)" opacity="0.7" />
                      <rect x="15" y="20" width="5" height="35" fill="var(--color-primary)" opacity="0.7" />
                      <rect x="25" y="10" width="5" height="45" fill="var(--color-primary)" opacity="0.7" />
                      <rect x="35" y="5" width="5" height="50" fill="var(--color-primary)" opacity="0.7" />
                      <rect x="45" y="15" width="5" height="40" fill="var(--color-primary)" opacity="0.7" />
                      <rect x="55" y="25" width="5" height="30" fill="var(--color-primary)" opacity="0.7" />
                      <rect x="65" y="20" width="5" height="35" fill="var(--color-primary)" opacity="0.7" />
                      <rect x="75" y="25" width="5" height="30" fill="var(--color-primary)" opacity="0.7" />
                      <rect x="85" y="30" width="5" height="25" fill="var(--color-primary)" opacity="0.7" />
                    </svg>
                    <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>
                      24-Hour Energy Usage
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ 
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                overflow: 'hidden',
                height: '250px',
                background: 'var(--bg-color)'
              }}>
                <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Forecasted Demand</h3>
                </div>
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 'calc(100% - 54px)',
                  background: 'var(--bg-color)'
                }}>
                  <div className="placeholder-chart" style={{
                    width: '100%',
                    height: '100%', 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'repeating-linear-gradient(45deg, var(--bg-color-secondary), var(--bg-color-secondary) 10px, var(--bg-color) 10px, var(--bg-color) 20px)'
                  }}>
                    <svg viewBox="0 0 100 50" width="40" height="20">
                      <path 
                        d="M0,25 C10,20 20,30 30,15 C40,0 50,10 60,20 C70,30 80,15 90,10 L100,20" 
                        stroke="var(--color-primary)" 
                        strokeWidth="2" 
                        strokeDasharray="5,2" 
                        fill="none" 
                      />
                      <path 
                        d="M0,25 C10,20 20,30 30,15 C40,0 50,10 60,20" 
                        stroke="var(--color-primary)" 
                        strokeWidth="2" 
                        fill="none" 
                      />
                    </svg>
                    <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>
                      7-Day Energy Forecast
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div style={{ 
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              overflow: 'hidden',
              background: 'var(--bg-color)'
            }}>
              <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Energy Consumption Records</h3>
              </div>
              <div style={{ 
                overflowX: 'auto',
                padding: '0.5rem'
              }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  fontSize: '0.9rem'
                }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>Timestamp</th>
                      <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid var(--border-color)' }}>Energy (kWh)</th>
                      <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid var(--border-color)' }}>Temperature (°C)</th>
                      <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid var(--border-color)' }}>Humidity (%)</th>
                      <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid var(--border-color)' }}>Cost ($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>2023-03-24 23:00</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid var(--border-color)' }}>45.2</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid var(--border-color)' }}>22.4</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid var(--border-color)' }}>68</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid var(--border-color)' }}>7.23</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>2023-03-24 22:00</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid var(--border-color)' }}>48.7</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid var(--border-color)' }}>21.8</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid var(--border-color)' }}>65</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid var(--border-color)' }}>7.79</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>2023-03-24 21:00</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid var(--border-color)' }}>52.3</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid var(--border-color)' }}>21.2</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid var(--border-color)' }}>63</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid var(--border-color)' }}>8.37</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>2023-03-24 20:00</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid var(--border-color)' }}>57.9</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid var(--border-color)' }}>20.7</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid var(--border-color)' }}>60</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid var(--border-color)' }}>9.26</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem', textAlign: 'left' }}>2023-03-24 19:00</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>61.5</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>20.1</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>58</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>9.84</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Dashboard Footer */}
          <div style={{ 
            padding: '1rem 2rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}>
            <div>Agricultural Energy Optimization Platform • Last updated: 2023-03-25 01:15</div>
            <div>Model Accuracy: MAE: 4.28 kWh | RMSE: 5.73 kWh</div>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', maxWidth: '800px' }}>
          <p><em>Note: This is a static representation of the Agricultural Energy Optimization Platform dashboard. The actual dashboard is an interactive Python application with real-time data visualization and analytics.</em></p>
        </div>
      </div>
    </div>
  );
};

export default HoyaDesigns; 