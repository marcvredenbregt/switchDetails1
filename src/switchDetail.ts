/**
 * Interface representing details of switch-data, in JSON format.
 * @author Marc vredenbregt
 */
export interface SwitchDetail {
    error?: string;
    port: number;
    media_type?: string;
    vendor_name?: string;
    part_number?: string;
    serial_number?: string;
    wavelength?: string;
    temp?: {
      value: number;
      status: string;
    };
    'voltage_aux-1'?: {
      value: number;
      status: string;
    };
    tx_power?: {
      value: number;
      status: string;
    };
    rx_power?: {
      value: number;
      status: string;
    };
    tx_bias_current?: {
      value: number;
      status: string;
    };
}
