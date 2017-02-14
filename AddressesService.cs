using Sabio.Web.Models.Requests;
using System;
using System.Data;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Sabio.Data;
using Sabio.Web.Domain;
using Sabio.Web.Services.Interfaces;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Sabio.Web.Services
{
    public class AddressesService : BaseService, IAddressesService
    {
        private IUserService _userService;

        public AddressesService(IUserService userService)
        {
            _userService = userService;
        }
        public static Address MapAddress(IDataReader reader)
        {
            Address thisAddress = new Address();
            StateOrTerritory state = new StateOrTerritory();
            thisAddress.State = state;
            int startingIndex = 0;

            thisAddress.Id = reader.GetSafeInt32(startingIndex++);
            thisAddress.DateCreated = reader.GetSafeDateTime(startingIndex++);
            thisAddress.DateModified = reader.GetSafeDateTime(startingIndex++);
            thisAddress.UserId = reader.GetSafeString(startingIndex++);
            thisAddress.AddressLine1 = reader.GetSafeString(startingIndex++);
            thisAddress.AddressLine2 = reader.GetSafeString(startingIndex++);
            thisAddress.City = reader.GetSafeString(startingIndex++);
            thisAddress.State.Id = reader.GetSafeInt32(startingIndex++);
            thisAddress.State.Code = reader.GetSafeString(startingIndex++);
            thisAddress.State.Name = reader.GetSafeString(startingIndex++);
            thisAddress.PostalCode = reader.GetSafeString(startingIndex++);
            thisAddress.IsDeleted = reader.GetSafeBool(startingIndex++);

            return thisAddress;
        }

        public int CreateAddress(AddressCreateRequest newAddress)
        {
            int result = -1;
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.Addresses_Insert", inputParamMapper: delegate (SqlParameterCollection parameters)
            {
                parameters.AddWithValue("@AddressLine1", newAddress.AddressLine1);
                if (string.IsNullOrWhiteSpace(newAddress.AddressLine2)) //if (newAddress.AddressLine2 == null)
                {
                    parameters.AddWithValue("@AddressLine2", DBNull.Value);
                }
                else
                {
                    parameters.AddWithValue("@AddressLine2", newAddress.AddressLine2);
                }
                parameters.AddWithValue("@City", newAddress.City);
                parameters.AddWithValue("@StateId", newAddress.StateId);
                parameters.AddWithValue("@PostalCode", newAddress.PostalCode);
                parameters.AddWithValue("@UserId", _userService.GetCurrentUserId());

                parameters.Add(new SqlParameter
                {
                    DbType = System.Data.DbType.Int32,
                    Direction = System.Data.ParameterDirection.Output,
                    ParameterName = "@Id"
                });
            },
            returnParameters: delegate (SqlParameterCollection parameters)
            {
                result = int.Parse(parameters["@Id"].Value.ToString());
            }
            );
            return result;
        }

        public void UpdateAddress(AddressCreateRequest newAddress, string userId)
        {
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.Addresses_UpdateByUserId", inputParamMapper: delegate (SqlParameterCollection parameters)
            {
                parameters.AddWithValue("@AddressLine1", newAddress.AddressLine1);
                if (string.IsNullOrWhiteSpace(newAddress.AddressLine2)) //if (newAddress.AddressLine2 == null)
                {
                    parameters.AddWithValue("@AddressLine2", DBNull.Value);
                }
                else
                {
                    parameters.AddWithValue("@AddressLine2", newAddress.AddressLine2);
                }
                parameters.AddWithValue("@City", newAddress.City);
                parameters.AddWithValue("@StateId", newAddress.StateId);
                parameters.AddWithValue("@PostalCode", newAddress.PostalCode);
                parameters.AddWithValue("@UserId", userId);
            });
        }

        public List<Address> GetAllAddresses()
        {
            List<Address> list = null;

            DataProvider.ExecuteCmd(GetConnection, "dbo.Addresses_SelectAll", inputParamMapper: delegate (SqlParameterCollection parameters)
            {

            }
            , map: delegate (IDataReader reader, short set)
            {
                Address address = MapAddress(reader);

                if (list == null)
                {
                    list = new List<Address>();
                }

                list.Add(address);
            }
            );
            return list;
        }

        public void DeleteAddress(int id)
        {
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.Addresses_UpdateIsDeleted", inputParamMapper: delegate (SqlParameterCollection parameters)
            {
                parameters.AddWithValue("@Id", id);
            });
        }

        public Address GetAddressById(int id)
        {
            Address address = null;

            DataProvider.ExecuteCmd(GetConnection, "dbo.Addresses_SelectById", inputParamMapper: delegate (SqlParameterCollection parameters)
            {
                parameters.AddWithValue("@Id", id);
            }
            , map: delegate (IDataReader reader, short set)
            {
                address = MapAddress(reader);
            }
            );
            return address;
        }

        public Address SelectByUserId(string currentUser)
        {
            Address accountInfo = null;

            DataProvider.ExecuteCmd(
                GetConnection,
                "[dbo].[Addresses_GetByUserId]",
                inputParamMapper: delegate (SqlParameterCollection parameters)
                {
                    parameters.AddWithValue("@UserId", _userService.GetCurrentUserId());
                },

                map: delegate (IDataReader reader, short set)
                {
                    accountInfo = MapAddress(reader);
                });
            return accountInfo;
        }

    }
}