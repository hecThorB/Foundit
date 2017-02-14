using FoundIt.Web.Domain;
using FoundIt.Web.Models.Requests;
using System.Collections.Generic;

namespace FoundIt.Web.Services.Interfaces
{
    public interface IAddressesService
    {
        int CreateAddress(AddressCreateRequest newAddress);
        void UpdateAddress(AddressCreateRequest newAddress, string userId);
        List<Address> GetAllAddresses();
        void DeleteAddress(int id);
        Address GetAddressById(int id);
        Address SelectByUserId(string CurrentUser);
    }
}
