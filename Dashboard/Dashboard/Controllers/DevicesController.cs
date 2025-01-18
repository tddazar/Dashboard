using Dashboard.Models;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DevicesController : ControllerBase
    {
        private static List<Device> devices = new List<Device>
        {
            new Device { Id = 1, Name = "Temperature Sensor", Type = "Sensor", IsOnline = true },
            new Device { Id = 2, Name = "Smart Light", Type = "Actuator", IsOnline = false },
        };

        [HttpGet]
        public IActionResult GetAllDevices()
        {
            return Ok(devices);
        }

        [HttpGet("{id}")]
        public IActionResult GetDevice(int id)
        {
            var device = devices.FirstOrDefault(d => d.Id == id);
            if (device == null) return NotFound();
            return Ok(device);
        }

        [HttpPost]
        public IActionResult CreateDevice(Device newDevice)
        {
            newDevice.Id = devices.Max(d => d.Id) + 1;
            devices.Add(newDevice);
            return CreatedAtAction(nameof(GetDevice), new { id = newDevice.Id }, newDevice);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateDevice(int id, Device updatedDevice)
        {
            var device = devices.FirstOrDefault(d => d.Id == id);
            if (device == null) return NotFound();

            device.Name = updatedDevice.Name;
            device.Type = updatedDevice.Type;
            device.IsOnline = updatedDevice.IsOnline;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteDevice(int id)
        {
            var device = devices.FirstOrDefault(d => d.Id == id);
            if (device == null) return NotFound();

            devices.Remove(device);
            return NoContent();
        }
    }
}
