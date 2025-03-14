package BookShop.demo.service;

import BookShop.demo.Exceptions.EmailAlreadyExistsException;
import BookShop.demo.Exceptions.NoContentFoundException;
import BookShop.demo.Exceptions.RessourceNotFoundException;
import BookShop.demo.Exceptions.UserNotAuthorizedToDoThisActionException;
import BookShop.demo.dto.UserInfoDTO;
import BookShop.demo.dto.UserLoginDTO;
import BookShop.demo.dto.UserResponseDTO;
import BookShop.demo.dtoMapper.userMapper.UserInfoMapper;
import BookShop.demo.dtoMapper.userMapper.UserLoginMapper;
import BookShop.demo.dtoMapper.userMapper.UserResponseMapper;
import BookShop.demo.model.User;
import BookShop.demo.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    BasketService basketService;

    @Autowired
    UserLoginMapper userLoginMapper;
    @Autowired
    UserResponseMapper userResponseMapper;
    @Autowired
    UserInfoMapper userInfoMapper;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);

    public UserResponseDTO getUserById(int userId) throws RessourceNotFoundException {
        User user = userRepository.findById(userId);
        if(user == null){
            throw new RessourceNotFoundException(String.format("The user with the id %d is not found", userId) );
        }
        return userResponseMapper.toDTO(user);
    }

    public List<UserResponseDTO> findAllUsers() throws NoContentFoundException {
        List<User> allUsers = userRepository.findAll();
        List<UserResponseDTO> mappedUsers = new ArrayList<>();
        for(User user : allUsers){
            mappedUsers.add(userResponseMapper.toDTO(user));
        }
        if(allUsers == null){
            throw new NoContentFoundException("There are no users yet in the Application");
        }else{
            return mappedUsers;
        }
    }

    public void modifyUserInfos
            (int userId, UserInfoDTO newUser, UserDetails userDetails)
            throws RessourceNotFoundException, UserNotAuthorizedToDoThisActionException {
        User user = userRepository.findById(userId);

        if(user == null){
            throw new RessourceNotFoundException("The user you want to modify does not exist");
        }

        log.info(newUser.toString());

        String email = userDetails.getUsername();
        String role = userDetails.getAuthorities().toString();

        if(!role.contains("ROLE_ADMIN") && !email.equals(user.getEmail()) ){
            throw new UserNotAuthorizedToDoThisActionException("You are not allowed to modify this user's data");
        }

        if(newUser.getEmail() != null){
            user.setEmail(newUser.getEmail());
        }
        if(newUser.getFirstName() != null){
            user.setFirstName(newUser.getFirstName());
        }
        if(newUser.getLastName() != null){
            user.setLastName(newUser.getLastName());
        }
        if(newUser.getPassword() != null){
            user.setPassword(  new BCryptPasswordEncoder(10).encode(newUser.getPassword()) );
        }

        userRepository.save(user);
    }

    public void modifyProfileImage
            (int userId, MultipartFile file, UserDetails userDetails)
            throws IOException, UserNotAuthorizedToDoThisActionException, RessourceNotFoundException {

        User user = userRepository.findById(userId);
        if(user == null){
            throw new RessourceNotFoundException("The user does not exist");
        }

        String email = userDetails.getUsername();
        String role = userDetails.getAuthorities().toString();

        if(!role.contains("ROLE_ADMIN") && !email.equals(user.getEmail())){
            throw new UserNotAuthorizedToDoThisActionException("You are not allowed to change this user's picture");
        }

        user.setImage(file.getBytes());


        userRepository.save(user);

    }

    public URI register(User user , UriComponentsBuilder ucb) throws EmailAlreadyExistsException {

        if(userRepository.existsByEmail(user.getEmail())){
            throw new EmailAlreadyExistsException("An account with this email already exists");
        }
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
        log.info(user.toString());

        URI location = ucb
                .path("/users/{id}")
                .buildAndExpand(user.getId())
                .toUri();
        return  location;
    }

    public UserInfoDTO userExists(UserLoginDTO userLogin, UriComponentsBuilder ucb) throws RessourceNotFoundException{

        if(!userRepository.existsByEmail(userLogin.getEmail())){
            throw new RessourceNotFoundException("User does not exist");
        }

        User userDb = userRepository.findByEmail(userLogin.getEmail());

        if(BCrypt.checkpw(userLogin.getPassword(), userDb.getPassword())){
            return userInfoMapper.toDTO(userDb);
        }

        throw  new RessourceNotFoundException("Password used does not match user's password");

    }

    public void deletUserById(int userId, UserDetails userDetails)
        throws UserNotAuthorizedToDoThisActionException, RessourceNotFoundException{

        User user = userRepository.findById(userId);
        if(user == null){
            throw new RessourceNotFoundException("User you want to delete does not exists");
        }

        String email = userDetails.getUsername();
        String role = userDetails.getAuthorities().toString();

        if(!role.contains("ROLE_ADMIN") && !email.equals(user.getEmail())){
            throw new UserNotAuthorizedToDoThisActionException("You are not allowed to change this user's picture");
        }

        userRepository.deleteById(userId);
    }
}
