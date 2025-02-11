package BookShop.demo.dtoMapper;

import BookShop.demo.dto.UserLoginDTO;
import BookShop.demo.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserLoginMapper {
    UserLoginDTO toDTO(User user);
    User toEntity(UserLoginDTO userDTO);
}
